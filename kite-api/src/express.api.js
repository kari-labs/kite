require('dotenv').config();
const express = require('express');
const session = require('express-session');

const redis = require('redis').createClient(6379, 'kiteredis');
const RedisStore = require('connect-redis')(session);
const cors = require('cors');

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user.model');
const { dbConnect } = require('./utils/mongo.util');
const { saltRounds } = require('../config/config');

dbConnect();

const query = User.countDocuments({ scope: { $in: ["createAdmin"] }}).exec();
query.then(async count => {
  if(count < 1) {
    const hash = await bcrypt.hash('pass', saltRounds);
    new User({
      _id: mongoose.Types.ObjectId(),
      userid: 'admin',
      password: hash,
      forceReset: true,
      logins: 0,
      name: 'defaultUser',
      containers: [],
      preferences: {
        theme: 'Light'
      },
      scope: ["containers", "admin", "createAdmin"],
    }).save();
  }
});

const app = express();
const port = 3000;

const corsOptions = {
  origin: 'http://localhost:8081',
  credentials: true,
}

const docker = require('./routes/docker.router');
const graphql = require('./routes/graphql.router');

const sessionConfig = {
  store: new RedisStore({
    client: redis
  }),
  secret: process.env.REDIS_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 10800000 // 3 hours in ms
  }
}

if(app.get('env') === 'production') {
  app.set('trust proxy', 1);
  sessionConfig.cookie.secure = true;
}

app.use(session(sessionConfig));

app.use('/api/docker', cors(corsOptions), docker);
app.use('/api/graphql', cors(corsOptions), graphql);

app.listen(port, () => console.log(`KITE-API listening on port ${port}!`));