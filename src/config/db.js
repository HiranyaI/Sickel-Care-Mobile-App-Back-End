const mongoose = require('mongoose');
require('dotenv').config();

const ConnectToMongo = async () => {
  try {
    await mongoose.connect(process.env.CONNECTIONURL);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = { ConnectToMongo, mongoose };