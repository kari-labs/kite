const fs = require('fs');
const Docker = require('dockerode');
const config = require('../../config/config');
const { ObjectId } = require("mongoose").Types;

const Container = require("../models/container.model");

const docker = new Docker(config.dockerConfig);
const containers = {};

//This function fixes the ObjectId of mongoose query responses from appearing as a BSON object
const standardize = obj => ({...obj.toObject(), _id: obj._id.toString()})

async function createContainer(options) {
  if (!fs.existsSync(config.userFolderPath))
    fs.mkdirSync(config.userFolderPath);
  if (!fs.existsSync(`${config.userFolderPath}${options.userid}`))
    fs.mkdirSync(`${config.userFolderPath}${options.userid}`);

  await docker.pull(config.phpServerImage);

  let dockerContainerName = options.userid+"_"+options.nickname.replace(/[\s]/g, "_");

  let container = await docker.createContainer({
    name: dockerContainerName,
    image: config.phpServerImage,
    HostConfig: {
      RestartPolicy: config.dockerConfig.RestartPolicy,
      NetworkMode: config.networkName,
      Binds: [
        `${config.userHostFolderPath}${options.userid}:/app/htdocs/`
      ],
    },
  });

  await container.start();
  containers[dockerContainerName] = container;

  let info = await container.inspect();
  let c;
  if(container){
    c = new Container(
      {
        nickname: options.nickname,
        owner: ObjectId(options.owner),
        container_id: info.Id,
        status: info.State.Status,
        image: info.Config.Image
      }
    );
  }
  let saved = await c.save();
  return {
    ...saved.toObject(),
    _id: saved._id.toString()
  };
}

async function getContainer(container_id) {
  let container = await Container.findOne(
    {
      container_id: {
        $regex: `^(${container_id}\\w*)$`
      }
    }
  )
  .populate("owner")
  .exec();
  return standardize(container);
}

const getContainers = async _id => {
  let user_containers = await Container.find({owner: { _id }}).populate('owner').exec();
  return user_containers.map(c=>standardize(c));
};

async function deleteContainer(_id) {
  let c = await Container.findByIdAndDelete(_id).exec();
  let container = docker.getContainer(c.container_id);
  await container.stop();
  await container.remove();
  return c;
}

//This might be why the API takes 3000+ years to stop
process.on('SIGTERM', () => {
  for (let container of Object.keys(containers)) {
    container.stop();
  }
});

module.exports = { createContainer, deleteContainer, getContainer, getContainers }