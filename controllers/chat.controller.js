const express = require("express");
const Chat = require("../models/Chat");
const User = require("../models/User");

exports.createChat = async (req, res) => {
  const { users } = req.body;
  console.log(req.body);

  try {
    if (!users || users.length === 0) {
      return res.status(400).json({ message: "Users array required" });
    }
    users.push(req.user.userId);

    console.log(users);
    if (users.length === 2) {
      const existingChat = await Chat.findOne({
        isGroup: false,
        users: { $all: users, $size: 2 },
      }).populate("users", "-password");
      if (existingChat) return res.status(200).json(existingChat);
    }

    let chatName;

    if (users.length === 2) {
      // 1-1 chat: find the other user's name
      const otherUserId = users.find(
        (userId) => userId.toString() !== req.user.userId.toString()
      );
      const otherUser = await User.findById(otherUserId).select("name");
      chatName = otherUser?.name || "Personal Chat"; // fallback if not found
    } else {
      // Group chat
      chatName = req.body.chatName || "New Group";
    }

    const chat = await Chat.create({
      users,
      isGroup: users.length > 2,
      chatName,
    });

    const fullChat = await Chat.findById(chat._id).populate(
      "users",
      "-password"
    );

    res.status(201).json(fullChat);
  } catch (error) {
    console.error("Error creating chat:", error.message);
    res.status(500).json({ message: "Server error. Could not create chat." });
  }
};

exports.allChats = async (req, res) => {
  const userId = req.user.userId;
  try {
    const chats = await Chat.find({ users: userId }).populate(
      "users",
      "-password"
    );
    if (!chats)
      return res
        .status(404)
        .json({ messsage: "No chats found, Add to starat chatting..!" });
    res.status(200).json({ chats, message: "All chats retrived" });
  } catch (error) {
    console.error("Error Fetching chats: ", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.singleChat = async (req, res) => {
  const { id } = req.params;
  try {
    const chat = await Chat.findById(id).populate("users", "-password");

    if (!chat) return res.status(404).json({ message: "No chat found" });
    res.status(200).json({ chat, message: "Chat recieved" });
  } catch (error) {
    console.error("Single Chat Errror", error.message);
    res.status(500).json({ message: "Server error. Could not retrieve chat." });
  }
};
