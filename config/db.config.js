const mongoose = require("mongoose");
const { MONGO_URI } = require("./env.config");

const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Mongodb Connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDb;
