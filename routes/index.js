const express = require("express");
const authRouter = require("./auth.route");
const chatRouter = require("./chat.route");
const userRouter = require("./user.route");
const messageRouter = require("./message.route");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/chats", chatRouter);
router.use("/users", userRouter);
router.use("/message", messageRouter);

module.exports = router;
