const Chat = require("../model/chatModel");

const catchAsync = require("../utils/catchAsync");

exports.getAllChatsForUser = catchAsync(async (req, res, next) => {
  const { reciever, sender } = req.body;

  const chats = await Chat.find({ reciever, sender });

  res.status(200).json({
    status: "success",
    result: chats.length,
    chats,
  });
});
