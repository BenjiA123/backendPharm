const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  reciever: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  type: {
    required: true,
    type: String,
    enum: ["chatMessage", "emailMessage"],
    default: "chatMessage",
  },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
