const jwt = require("jsonwebtoken");
const { JWT_SECRET, EXPIRY_TIME } = require("../config/env.config");

const generateToken = async (userId, phone) => {
  return jwt.sign({ userId, phone }, JWT_SECRET, { expiresIn: EXPIRY_TIME });
};

module.exports = generateToken;
