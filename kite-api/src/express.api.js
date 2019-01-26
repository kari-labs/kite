const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;


const docker = require('./routes/docker.router');
const graphql = require('./routes/graphql.router');

app.use('/api/docker', cors(), docker);
app.use('/api/graphql', cors(), graphql);

app.listen(port, () => console.log(`KITE-API listening on port ${port}!`));