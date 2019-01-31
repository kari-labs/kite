const fs = require('fs');
const Docker = require('dockerode');
const config = require('../../config/config');
const { ObjectId } = require("mongoose").Types;

const { dbConnect } = require('./mongo.util');
const Container = require("../models/container.model");

const docker = new Docker(config.dockerConfig);
const containers = {};

dbConnect(process.env.DB_CONTAINER_USER, process.env.DB_CONTAINER_PASS);

async function createContainer(obj) {
  if (!fs.existsSync(config.userFolderPath))
    fs.mkdirSync(config.userFolderPath);
  if (!fs.existsSync(`${config.userFolderPath}${obj.userid}`))
    fs.mkdirSync(`${config.userFolderPath}${obj.userid}`);

  await docker.pull(config.phpServerImage);

  let container = await docker.createContainer({
    name: `${obj.userid}php`,
    image: config.phpServerImage,
    HostConfig: {
      AutoRemove: true,
      NetworkMode: config.networkName,
      Binds: [
        `${config.userHostFolderPath}${obj.userid}:/app/htdocs/`
      ],
    },
  });
  await container.start();
  containers[`${obj.userid}php`] = container;

  let info = await container.inspect();

  let c = new Container(
    {
      nickname: obj.nickname,
      owner: ObjectId(obj.owner),
      container_id: info.Id,
      status: info.State.Status,
      image: info.Config.Image
    }
  );
  const savedContainer = await c.save();

  return savedContainer;
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
  return container;
}

async function getContainers() {
  const containers = await Container.find({}).populate('owner').exec();
  return containers;
}

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