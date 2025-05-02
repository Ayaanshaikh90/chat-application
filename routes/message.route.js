const express = require("express");
const {
  chatMessage,
  receiveMessage,
} = require("../controllers/message.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", protect, chatMessage);
router.get("/:chatId", protect, receiveMessage);

module.exports = router;
