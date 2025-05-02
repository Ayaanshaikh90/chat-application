const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

//Register Handler
exports.register = async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const userExist = await User.findOne({ phone });

    if (userExist)
      return res
        .status(409)
        .json({ message: "User already exists with this phone number." });

    const user = await User.create({
      name,
      phone,
      password: hashedPassword,
    });

    const token = await generateToken(user._id, phone);
    console.log(token);

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
      },
      message: "User created successfully..!",
    });
  } catch (error) {
    console.error("Registration Error:", error.message);
    return res.status(500).json({
      message: "Internal server error. Please try again.",
    });
  }
};

//Login Handler
exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    console.log(phone, password);

    const user = await User.findOne({ phone });
    console.log(user);

    if (!user) return res.status(404).json({ message: "User Not Found." });

    const verified = await bcrypt.compare(password, user.password);

    if (!verified)
      return res.status(401).json({ message: "Invalid Credentials" });
    const token = await generateToken(user._id, phone);
    res.status(200).json({
      token,
      user: { _id: user._id, name: user.name, phone: user.phone },
    });
  } catch (error) {
    console.error("Login Error : ", error.message);
    return res
      .status(500)
      .res.json({ message: "Internal server error. Please try again." });
  }
};
