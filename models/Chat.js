const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema(
  {
    chatName: {
      type: String,
      required: true,
    },
    isGroup: {
      type: Boolean,
      default: "false",
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", ChatSchema);
