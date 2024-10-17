const mongoose = require('mongoose');
require('dotenv').config();

const mongouri ="mongodb+srv://Sannith:Sannith2003@projectdashboard.qfgfw.mongodb.net/?retryWrites=true&w=majority&appName=ProjectDashBoard"
const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongouri, {
        dbName: 'projectsList', // Only keep dbName here
      });
      console.log('MongoDB connected');
    } else {
      console.log('Already connected to MongoDB');
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('MongoDB connection failed');
  }
};

module.exports = connectDB;
