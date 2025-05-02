const { JWT_SECRET } = require("../config/env.config");
const jwt = require("jsonwebtoken");

exports.protect = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized access!" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid token. Please log in again" });
  }
};
