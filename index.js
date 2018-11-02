const fs = require('fs');
const Docker = require('dockerode');

const docker = new Docker({host: '127.0.0.1', port: 2375})

async function createNginxContainer() {
    return await docker.createContainer({
        name: 'kite-nginx',
        image: 'kite-nginx',
        HostConfig: {
            NetworkMode: 'kite',
            PortBindings: {
                '80/tcp': [
                    {
                        'HostIp': '0.0.0.0',
                        'HostPort': '8080'
                    }
                ]
            },
        },
    });
}

async function startOrCreateNginxContainer() {
    const all = await docker.listContainers({
        all: true,
        filters: '{"name": ["kite-nginx"]}'
    });

    let container;
    if(all.length == 0) {
        container = await createNginxContainer();
    } else {
        const running = await docker.listContainers({
            filters: '{"name": ["kite-nginx"]}'
        });

        if(running.length == 0) {
            container = docker.getContainer(all[0].Id);
        } else {
            return true;
        }
    }
    console.log(container);
    return await container.start();
}

async function createContainer(userid) {
    if(!fs.existsSync(`C:/public-html/`))
        fs.mkdirSync(`C:/public-html/`);
    if(!fs.existsSync(`C:/public-html/${userid}`))
        fs.mkdirSync(`C:/public-html/${userid}`);

    let container = await docker.createContainer({
        name: `${userid}php`,
        image: 'smolphp',
        HostConfig: {
            AutoRemove: true,
            NetworkMode: 'kite',
            Binds: [
                `/c/public-html/${userid}:/app/htdocs/`
            ],
            /*PortBindings: {
                '5000/tcp': [
                    {
                        'HostIp': '0.0.0.0',
                        'HostPort': `${lastPort++}`
                    }
                ]
            },*/
        }
    })

    container.start();
}

startOrCreateNginxContainer();

module.exports = { createContainer }