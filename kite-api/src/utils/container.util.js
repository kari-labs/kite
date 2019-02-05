const fs = require('fs');
const Docker = require('dockerode');
const config = require('../../config/config');
const { ObjectId } = require("mongoose").Types;

const Container = require("../models/container.model");

const docker = new Docker(config.dockerConfig);
const containers = {};

async function createContainer(options) {
  if (!fs.existsSync(config.userFolderPath))
    fs.mkdirSync(config.userFolderPath);
  if (!fs.existsSync(`${config.userFolderPath}${options.userid}`))
    fs.mkdirSync(`${config.userFolderPath}${options.userid}`);

  await docker.pull(config.phpServerImage);

  let dockerContainerName = options.userid+"_"+options.nickname.replace(" ", "_");

  let container = await docker.createContainer({
    name: dockerContainerName,
    image: config.phpServerImage,
    HostConfig: {
      AutoRemove: false,
      NetworkMode: config.networkName,
      Binds: [
        `${config.userHostFolderPath}${options.userid}:/app/htdocs/`
      ],
    },
  });
  await container.start();
  containers[dockerContainerName] = container;

  let info = await container.inspect();

  let c = new Container(
    {
      nickname: options.nickname,
      owner: ObjectId(options.owner),
      container_id: info.Id,
      status: info.State.Status,
      image: info.Config.Image
    }
  );
  const savedContainer = await c.save();

  return savedContainer;
}

async function getContainer(container_id) {
  //let actual_status = (await docker.getContainer(container_id).inspect()).State.Status;
  let container = await Container.findOne(
    {
      container_id: {
        $regex: `^(${container_id}\\w*)$`
      }
    }
  )
  .populate("owner")
  .exec();
  return container;
}

const getContainers = async _id => {
  let user_containers = await Container.find({owner: { _id }}).populate('owner').exec();
  user_containers.forEach( async uc => {
    const c = docker.getContainer(uc.container_id)
    const status = (await c.inspect()).State.Status;
    if(status === uc.status){
      //Good to go
    }else if (status !== uc.status && uc.status === "running") {
      //Start the container
      await c.start();
    }
  });
  return user_containers;
};

async function stopContainer(userid) {
  let container = docker.getContainer(userid);
  let stopped = await container.stop();
  return stopped;
}

process.on('SIGTERM', () => {
  for (let container of Object.keys(containers)) {
    stopContainer(container);
  }
});

module.exports = { createContainer, stopContainer, getContainer, getContainers }