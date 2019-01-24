const router = require('express').Router();

const { createContainer, stopContainer, getContainer, getAllContainers } = require('../index');

//HTTP 410 Gone -- The requested resource is no longer available at the server and no forwarding address is known. This condition is expected to be considered permanent.
//HTTP 503 Service Unavailable
//HTTP 204 No Content

const _404 = {
    error: 'Resource not found.',
    message: 'The requested container instance no longer exists on our server'
}
const _405 = {
    error: 'Testing',
    message: 'Testing Again'
}
const _500 = {
    error: 'Server Error',
    message: 'Server failed to spin up docker container'
}

router.get('/', async (req, res) => {
    let data;
    try {
        data = await getAllContainers();
        res.send(data);
    } catch (error) {
        res.status(404).json(_404);
        console.error(error);
    }
});

router.get('/:studentID', async (req, res) => {
    let data;
    try {
        data = await getContainer(req.params.studentID+'php');
        res.send(data);
    } catch (error) {
        res.status(404).json(_404);
        console.error(error);
    }
});

router.post('/:studentID', async (req, res) => {
    try {
        await createContainer(req.params.studentID);
        res.status(200).send({messsage: 'Container spun-up successfully'})
    } catch (error) {
        console.error('ERROR:',error);
        res.status(500).json(_500);
    }
});

router.delete('/:studentID', async (req, res)=>{
    let data = await stopContainer(req.params.studentID+'php');
    res.send(data);
});

module.exports = router;