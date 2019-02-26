const fs = require('fs');
const path = require('path')
const Docker = require('dockerode');
const config = require('../../config/config');
const { ObjectId } = require("mongoose").Types;

const Container = require("../models/container.model");
const User = require("../models/user.model");

const docker = new Docker(config.dockerConfig);
const containers = {};

//This function fixes the ObjectId of mongoose query responses from appearing as a BSON object
const objectify = obj => ({...obj.toObject(), _id: obj._id.toString()});

async function createContainer(options) {
  if (!fs.existsSync(config.userFolderPath))
    fs.mkdirSync(config.userFolderPath);
  if (!fs.existsSync(path.join(config.userFolderPath, options.userid)))
    fs.mkdirSync(path.join(config.userFolderPath, options.userid));
  if (!fs.existsSync(path.join(config.userFolderPath, options.userid, options.nickname)))
    fs.mkdirSync(path.join(config.userFolderPath, options.userid, options.nickname));
    
  await docker.pull(config.phpServerImage);

  let dockerContainerName = options.userid+"_" + options.nickname.replace(/[\s]/g, "_");

  let container = await docker.createContainer({
    name: dockerContainerName,
    image: config.phpServerImage,
    HostConfig: {
      RestartPolicy: config.dockerConfig.RestartPolicy,
      NetworkMode: config.networkName,
      Binds: [
        `${path.join(config.userFolderPath, options.userid, options.nickname)}:/app/htdocs/`
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
        image: info.Config.Image,
        deleted: false,
      }
    );
    if(c){
      await User.findByIdAndUpdate({_id: ObjectId(options.owner)}, { $push: { "containers": c._id.toString() } }, { new: true }).exec();
    }
  }else{
    throw new Error("Docker: Docker could not create the container");
  }
  let saved = await c.save();
  return {
    return objectify(saved);
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
  return objectify(container);
}

const getContainers = async _id => {
  let user_containers = await Container.find({owner: { _id }}).populate('owner').exec();
  return user_containers.map(c=>objectify(c));
};

async function deleteContainer(_id, owner, permanently = false) {
  let c;
  if(permanently){
    await User.findByIdAndUpdate({_id: ObjectId(owner)}, { $pull: { "containers": c._id.toString() } }, { new: false }).exec();
    c = await Container.findByIdAndDelete(_id).exec();
    let container = docker.getContainer(c.container_id);
    await container.stop();
    await container.remove();
  }else {
    c = await Container.findByIdAndUpdate(_id, {$set: { "deleted": true }});
    let container = docker.getContainer(c.container_id);
    await container.stop();
  }
  return c;
}

async function deleteAllContainers(owner, { removeFromUser = true}) {
  let user = await User.findById(owner).exec();
  if(removeFromUser == true){
    user.containers.forEach(async c => {
      await User.findByIdAndUpdate(owner, { $pull: {"containers": c} }).exec();
    });
  }
  
  console.log(user.containers.length);
}

//This might be why the API takes 3000+ years to stop
process.on('SIGTERM', () => {
  for (let container of Object.keys(containers)) {
    container.stop();
  }
});

module.exports = { createContainer, deleteContainer, getContainer, getContainers, deleteAllContainers }