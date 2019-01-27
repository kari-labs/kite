const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  userid: String,
  password: String,
  forceReset: Boolean,
  logins: Number,
  name: String,
  containers: [{
    type: Schema.Types.ObjectId,
    ref: 'Container'
  }],
  preferences: {
    theme: String
  },
  scope: [String]
});

module.exports = mongoose.model('User', userSchema);