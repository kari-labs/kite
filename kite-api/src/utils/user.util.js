const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const { dbConnect } = require('./mongo.util');
const saltRounds = 10;
dbConnect(process.env.DB_AUTH_USER, process.env.DB_AUTH_PASS);

const createUser = async (userData) => {
  bcrypt.hash(userData.password, saltRounds, (err, hash) => {
    if (err) throw new Error(`Error hashing password: ${err}`);
    new User({
      _id: mongoose.Types.ObjectId(),
      userid: userData.userid,
      password: hash,
      forceReset: true,
      logins: 0,
      name: userData.name,
      containers: [],
      preferences: {
        theme: "Light"
      },
      scope: userData.scope
    }).save();
  });
}

const loginUser = async (userData, req) => {
  const userDB = await User.findOne({ userid: userData.userid });
  const match = await bcrypt.compare(userData.password, userDB.password);
  if(match) {
    req.session.userStore = {...userDB._doc};
    return `Success`;
  }
  return "Incorrect user name or password";
}


module.exports = { createUser, loginUser };