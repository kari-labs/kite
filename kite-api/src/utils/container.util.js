const fs = require('fs');
const Docker = require('dockerode');
const config = require('../../config/config');
const { ObjectId } = require("mongoose").Types;

const { dbConnect } = require('./mongo.util');
const Container = require("../models/container.model");

const docker = new Docker(config.dockerConfig);
dbConnect(process.env.DB_CONTAINER_USER, process.env.DB_CONTAINER_PASS);

const containers = {};

const deleteContainer = async container_id => await Container.deleteOne({container_id});


async function createContainer(options) {
  if (!fs.existsSync(config.userFolderPath))
    fs.mkdirSync(config.userFolderPath);
  if (!fs.existsSync(`${config.userFolderPath}${options.userid}`))
    fs.mkdirSync(`${config.userFolderPath}${options.userid}`);

  await docker.pull(config.phpServerImage);

  let container = await docker.createContainer({
    name: options.nickname,
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
  containers[`${options.userid}php`] = container;

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
  let actual_status = (await docker.getContainer(container_id).inspect()).State.Status;
  let container = await Container.findOne(
    {
      container_id: {
        $regex: `^(${container_id}\\w*)$`
      }
    }
  )
  .populate("owner")
  .exec();
  /* 
  * If container is stopped, then update that container in the database, or delete it
  */
  if( actual_status != container.status && container.status == "running" ) deleteContainer(container_id);
  return container;
}

const getContainers = async _id => {
  let containers = await Container.find({owner: { _id }}).populate('owner').exec();
  //Error here
  return containers.filter(async c => c.status == ( await docker.getContainer(c.container_id).inspect() ).State.Status );
};

async function stopContainer(userid) {
  let container = docker.getContainer(userid);
  let stopped = await container.stop();
  return stopped;
}

process.on('SIGTERM', () => {
  for (let container of Object.keys(containers)) {
    //We dont want to delete the container from the DB because that defeats the purpose of the containers
    stopContainer(container);
  }
});

module.exports = { createContainer, stopContainer, getContainer, getContainers }