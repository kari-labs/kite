module.exports = {
    dockerConfig: {
        host: 'host.docker.internal',
        port: 2375,
        RestartPolicy: {
            Name: "always"
        }
    },
    userHostFolderPath: '/c/public-html/',
    userFolderPath: '/app/public/',
    phpServerImage: 'sseemayer/mini-php',
    networkName: 'kite_kite',
    saltRounds: 10,
}