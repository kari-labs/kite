module.exports = {
    dockerConfig: {
        host: 'host.docker.internal',
        port: 2375
    },
    userFolderPath: '/app/public/',
    phpServerImage: 'sseemayer/mini-php',
    networkName: 'kite'
}