const Chat = require("../models/Chat");
const Message = require("../models/message");

exports.chatMessage = async (req, res) => {
  const { content, chatId } = req.body;
  const userId = req.user.userId;
  try {
    const chat = await Chat.findById(chatId);
    if (!chat) return res.status(404).json({ message: "No chat found" });
    if (!chat.users.includes(userId))
      return res.status(403).json({ message: "User is not part of this chat" });

    const message = await Message.create({
      content,
      userId,
      chatId,
    });

    res.status(201).json({ message });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error sending the message" });
  }
};

exports.receiveMessage = async (req, res) => {
  const { chatId } = req.params;
  console.log("chatId", chatId);

  const userId = req.user.userId;
  try {
    const chat = await Chat.findById(chatId);
    if (!chat) return res.status(404).json({ message: "No chat found" });
    if (!chat.users.includes(userId))
      return res.status(403).json({ message: "User is not part of this chat" });

    const messages = await Message.find({ chatId }).populate(
      "userId",
      "-password"
    );

    res.status(200).json({ messages, message: "ALl messages fetched" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error fetching messages" });
  }
};
