const mongoose = require('mongoose');

const dbConnect = async () => {
  mongoose.connect(`mongodb://kitemongo:27017/kite`, { useNewUrlParser: true });
  const db = mongoose.connection;
  db.on('error', (err) => { 
    throw new Error(err)
  });
}

module.exports = { dbConnect };