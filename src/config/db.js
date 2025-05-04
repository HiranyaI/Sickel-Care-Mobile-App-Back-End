const mongoose = require('mongoose');
require('dotenv').config();

const ConnectToMongo = async () => {
  try {
    await mongoose.connect(process.env.CONNECTIONURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};


module.exports = { ConnectToMongo, mongoose };