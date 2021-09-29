const express = require("express");

const AuthController = require("../controllers/authController");
const ChatController = require("../controllers/chatController");
const chatRouter = express.Router();

chatRouter.use(AuthController.protect);

chatRouter.route("").post(ChatController.getAllChatsForUser);

module.exports = chatRouter;
