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

const deleteUser = async (userData) => {
  return User.findOneAndDelete({userid: userData.userid}).exec();
}

const loginUser = async (userData, req) => {
  const userDB = await User.findOne({ userid: userData.userid }).exec();
  if(userDB) {
    const match = await bcrypt.compare(userData.password, userDB.password);
    if(match) {
      const updatedUserDB = await User.findOneAndUpdate({ _id: userDB._id }, { logins: userDB.logins + 1 }, { new: true }).exec();
      req.session.userStore = updatedUserDB;
      return updatedUserDB;
    }
    return "Incorrect password.";
  }
  return "User does not exist.";
}
const getUsers = async () => {
  const users = await User.find();
  return users;
}

const getUser = req => {
  const user = req.session.userStore;
  if(user) {
    return user;
  }
  return {};
}

const signOutUser = req => {
  req.session.destroy();
  if(req.session === undefined) return true;
  else return false;
}

const updateUser = async (userIdToUpdate, userNewInfo) => {
  return await User.findOneAndUpdate({ userid: userIdToUpdate }, { ...userNewInfo }, { new: true }).exec();
}

module.exports = { 
  createUser, 
  loginUser, 
  getUser, 
  getUsers, 
  deleteUser, 
  signOutUser,
  updateUser
};