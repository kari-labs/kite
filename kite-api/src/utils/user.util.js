const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const { saltRounds } = require('../../config/config');

const createUser = async (userData) => {
  const hash = await bcrypt.hash(userData.password, saltRounds);
  const user = new User({
    _id: mongoose.Types.ObjectId(),
    userid: userData.userid,
    password: hash,
    forceReset: true,
    logins: 0,
    name: userData.name,
    containers: [],
    preferences: {
      theme: "Light",
    },
    scope: userData.scope,
  }).save();

  return user;
}

const loginUser = async (userData, req) => {
  const userDB = await User.findOne({ userid: userData.userid }).exec();
  const match = await bcrypt.compare(userData.password, userDB.password);
  if(match) {
    req.session.userStore = userDB;
    return userDB;
  }
  return "Incorrect user name or password";
}

const getUserScope = async (req) => {
  const user = req.session.userStore;
  if(user) {
    return user.scope
  }
  return [];
}


module.exports = { createUser, loginUser, getUserScope };