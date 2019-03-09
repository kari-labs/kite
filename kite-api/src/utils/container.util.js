const fs = require('fs');
const rimraf = require('rimraf');
const path = require('path')
const Docker = require('dockerode');
const config = require('../../config/config');
const { ObjectId } = require("mongoose").Types;

const Container = require("../models/container.model");
const User = require("../models/user.model");

const docker = new Docker(config.dockerConfig);

//This function fixes the ObjectId of mongoose query responses from appearing as a BSON object
const objectify = obj => ({...obj.toObject(), _id: obj._id.toString()});

async function createContainer(options) {
  /* If it follows the guidelines, then it's okay */
  const mongoContainers = await Container.find({}).exec();
  const mongoContainerNames = mongoContainers.map(c => c.nickname);
  if(options.nickname.match(/^([aA-zZ0-9-]+)$/)) {
    if(mongoContainerNames.includes(options.nickname)) throw new Error("A container with that name already exists");
    await docker.pull(config.phpServerImage);

    let dockerContainerName = options.userid+"asdfasdf" + options.nickname.replace(/[\s]/g, "-");

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
    // Start the container through docker
    await container.start();
    // Get more information about the new container
    let info = await container.inspect();
    // Instantiate a variable to hold the mongo-container object
    let c;
    // If docker successfully created the container
    if(container){
      // Create the container object in good 'ol mongo
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
      // If mongoose successfully creates the container in the DB
      if(c){
        // Add the container to the user's `containers` property
        await User.findByIdAndUpdate({_id: ObjectId(options.owner)}, { $push: { "containers": c._id.toString() } }, { new: true }).exec();
        // If the user folder holder folder does not exist, create it
        if (!fs.existsSync(config.userFolderPath))
          fs.mkdirSync(config.userFolderPath);
        //If the user folder does not exist, create it
        if (!fs.existsSync(path.join(config.userFolderPath, options.userid)))
          fs.mkdirSync(path.join(config.userFolderPath, options.userid));
        //If the container folder doesn't exist, create it
        if (!fs.existsSync(path.join(config.userFolderPath, options.userid, options.nickname)))
          fs.mkdirSync(path.join(config.userFolderPath, options.userid, options.nickname));
      }
    }else{
      // 🤷‍
      throw new Error("Kite could not create the container");
    }
    // Save the container
    let saved = await c.save();
    // Return the container
    return objectify(saved);
  }else throw new Error("Container name must match ^([aA-zZ0-9-_]+)$");
}

async function getContainer(container_id) {
  let container = await Container.findOne(
    {
      // Change this to use the full ID
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

async function deleteContainer(_id, owner, permanently) {
  let c;
  const {userid} = await User.findById(owner).exec();
  if(permanently){
    c = await Container.findByIdAndDelete(_id).exec();
    await User.findByIdAndUpdate({_id: ObjectId(owner)}, { $pull: { "containers": c._id.toString() } }, { new: false }).exec();
    let container = docker.getContainer(c.container_id);
    let info = await container.inspect();
    if(info.State.Status === "running") {
      await container.stop();
    }
    else await container.remove();
    const containerFolder = path.join(config.userFolderPath, userid, c.nickname);
    if(fs.existsSync(containerFolder)) rimraf.sync(containerFolder);
    
  }else {
    c = await Container.findByIdAndUpdate(_id, {$set: { "deleted": true }});
    let container = docker.getContainer(c.container_id);
    console.log(permanently);
    await container.stop();
    let info = await container.inspect();
    c = await Container.findByIdAndUpdate(_id, {$set: { "status": info.State.Status }});
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

async function restoreContainer(_id) {
  let container = await Container.findById(_id).populate('owner').exec();
  let dockerContainer = docker.getContainer(container.container_id);
  await Container.findByIdAndUpdate(_id, { $set: { "deleted": false, "status": "running" } }).exec();
  await dockerContainer.start();
}

//This might be why the API takes 3000+ years to stop
process.on('SIGTERM', async () => {
  for (let container of (await docker.listContainers())) {
    container.stop();
  }
});

module.exports = { createContainer, deleteContainer, getContainer, getContainers, deleteAllContainers, restoreContainer }