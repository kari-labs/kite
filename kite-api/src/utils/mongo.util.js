const mongoose = require('mongoose');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { saltRounds } = require('../../config/config');

const dbConnect = () => {
  mongoose.connect(`mongodb://kitemongo:27017/kite`, { useNewUrlParser: true, useFindAndModify: false });
  const db = mongoose.connection;
  db.on('error', (err) => { 
    throw new Error(err)
  });
}

const createDefaultAdmin = async (userid, password) => {
  const _MinimumNumberOfAdmins = 1;
  const count = await User.countDocuments({ scope: { $in: ["createAdmin"] }}).exec();
  
  if(count < _MinimumNumberOfAdmins) {
    const hash = await bcrypt.hash(password, saltRounds);
    new User({
      _id: mongoose.Types.ObjectId(),
      userid: userid,
      password: hash,
      forceReset: true,
      logins: 0,
      name: 'defaultAdmin',
      containers: [],
      preferences: {
        theme: 'Light'
      },
      scope: ["containers", "admin", "createAdmin"],
    }).save();
  }
}

module.exports = { dbConnect, createDefaultAdmin };