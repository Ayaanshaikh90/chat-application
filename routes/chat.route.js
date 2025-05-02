const express = require("express");
const {
  createChat,
  allChats,
  singleChat,
} = require("../controllers/chat.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/create", protect, createChat);
router.get("/", protect, allChats);
router.get("/:id", protect, singleChat);

module.exports = router;
