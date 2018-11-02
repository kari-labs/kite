const router = require('express').Router();

const { createContainer } = require('../index');

router.get('/', (req, res) => {
  res.send("This will return all the docker containers active");
});

router.post('/:studentID', async (req, res) => {
    let container;
    try {
        container = await createContainer(req.params.studentID);
    } catch (error) {
        console.error('ERROR:',error);
    }
    if(container){
        res.send("Spinning up a Docker container for "+req.params.studentID);
    }else{
        res.send("Failed to create container");
    }
});

module.exports = router;