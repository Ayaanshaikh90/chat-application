const dotenv = require("dotenv");
dotenv.config();

exports.PORT = process.env.PORT || 3000;
exports.MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/chat-app";
exports.JWT_SECRET = process.env.JWT_SECRET || "supersecret";
exports.EXPIRY_TIME = process.env.EXPIRY_TIME || "1h";
