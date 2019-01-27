const mongoose = require('mongoose');

const dbConnect = (username, password, callback) => {
  mongoose.connect(`mongodb+srv://${username}:${password}@${process.env.DB_HOST}`, { useNewUrlParser: true });
  const db = mongoose.connection;
  db.on('error', () => { 
    throw new Error('Error Connection to Database')
  });
  db.once('open', () => {
    callback();
  });
}

module.exports = { dbConnect };