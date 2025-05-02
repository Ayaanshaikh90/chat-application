// user.route.js
const express = require("express");
const { protect } = require("../middlewares/auth.middleware");
const {
  users,
  singleUser,
  profile,
} = require("../controllers/user.controller");

const router = express.Router();

router.get("/", protect, users); // /api/users  ✅
router.get("/:id", protect, singleUser); // /api/users/:id  ✅
router.get("/me/profile", protect, profile); // /api/users/me  ✅

module.exports = router;
