const fs = require('fs');
const Docker = require('dockerode');

const docker = new Docker({host: '127.0.0.1', port: 2375})

lastPort = 8002;

async function createContainer(userid) {
    if(!fs.existsSync(`C:/public-html/`))
        fs.mkdirSync(`C:/public-html/`);
    if(!fs.existsSync(`C:/public-html/${userid}`))
        fs.mkdirSync(`C:/public-html/${userid}`);

    let container = await docker.createContainer({
        name: `${userid}-php`,
        image: 'smolphp',
        HostConfig: {
            AutoRemove: true,
            NetworkMode: 'kite',
            Binds: [
                `/c/public-html/${userid}:/app/htdocs/`
            ],
            PortBindings: {
                '5000/tcp': [
                    {
                        'HostIp': '0.0.0.0',
                        'HostPort': `${++lastPort}`
                    }
                ]
            },
        }
    })

    container.start();
}

module.exports = {createContainer}