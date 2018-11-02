const fs = require('fs');
const Docker = require('dockerode');

const config = require('../config/config');

const docker = new Docker(config.dockerConfig)

async function createContainer(userid) {
    if(!fs.existsSync(config.userFolderPath))
        fs.mkdirSync(config.userFolderPath);
    if(!fs.existsSync(`${config.userFolderPath}${userid}`))
        fs.mkdirSync(`${config.userFolderPath}${userid}`);

    await docker.pull(config.phpServerImage);

    let container = await docker.createContainer({
        name: `${userid}php`,
        image: config.phpServerImage,
        HostConfig: {
            AutoRemove: true,
            NetworkMode: config.networkName,
            Binds: [
                `${config.userHostFolderPath}${userid}:/app/htdocs/`
            ],
        }
    })

    container.start();

    return container;
}

async function getContainer(userid){
    let container = docker.getContainer(userid);
    let containerInfo = await container.inspect();
    return containerInfo;
}

async function deleteContainer(userid){
    let container = docker.getContainer(userid);
    let containerInfo = await container.inspect();
    return containerInfo;
}

module.exports = { createContainer, deleteContainer, getContainer }