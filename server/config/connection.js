const mongoose = require('mongoose');

let connectionString;

if (process.env.NODE_ENV === 'production') {
  const mongoUser = process.env.MONGOUSER;
  const mongoPassword = process.env.MONGOPASSWORD;
  const mongoHost = process.env.MONGOHOST;
  const mongoPort = process.env.MONGOPORT;

  connectionString = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}`;
} else {
  connectionString = 'mongodb://127.0.0.1:27017/from-below';
}

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;
