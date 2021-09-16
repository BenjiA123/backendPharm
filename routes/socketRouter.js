const express = require("express");

const AuthController = require("../controllers/authController");
const SocketController = require("../controllers/socketController");

const socketRouter = express.Router();

socketRouter.use(
  AuthController.protect,
  AuthController.restrictTo("MD", "admin")
);

socketRouter.route("/").get(SocketController.searchSocket);

module.exports = socketRouter;
