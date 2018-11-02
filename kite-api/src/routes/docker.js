const router = require('express').Router();

const { createContainer, deleteContainer, getContainer } = require('../index');

router.get('/:studentID', async (req, res) => {
    let data = await getContainer(req.params.studentID+'php');
    res.send(data);
});

router.post('/:studentID', async (req, res) => {
    let container;
    try {
        container = await createContainer(req.params.studentID);
    } catch (error) {
        console.error('ERROR:',error);
    }
    if(container){
        res.send("Spinning up a Docker container for " + req.params.studentID);
    }else{
        res.send("Failed to create container");
    }
});

router.delete('/:studentID', async (req, res)=>{
    let data = await deleteContainer(req.params.studentID+'php');
    res.send(data);
});

module.exports = router;