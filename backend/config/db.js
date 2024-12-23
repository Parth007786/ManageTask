const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MONGO CONNECTION SUCCESS: ${conn.connection.host}`);
  } catch (error) {
    console.log(`MONGO CONNECTION FAILED: ${error.message}`);
  }
};

module.exports = connectDB;
