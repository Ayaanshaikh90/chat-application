const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Chat",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
