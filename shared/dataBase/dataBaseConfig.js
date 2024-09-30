const mongoose = require('mongoose');

const { MONGO_DB, DB_NAME } = process.env;

const dbConnection = async () => {
  try {
    await mongoose.connect(`${MONGO_DB}${DB_NAME}`);
    console.log("[INFO] MongoDB connected");
  } catch (error) {
    console.log("[ERROR] Failed to connect with MongoDB: " + error);
  }
};

module.exports = { dbConnection };