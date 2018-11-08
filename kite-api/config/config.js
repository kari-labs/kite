module.exports = {
    dockerConfig: {
        socketPath: '/var/run/docker.sock',
    },
    userHostFolderPath: '/app/kite/public-html/',
    userFolderPath: '/app/public/',
    phpServerImage: 'sseemayer/mini-php',
    networkName: 'kite_kite'
}