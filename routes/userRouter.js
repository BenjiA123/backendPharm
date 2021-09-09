const express = require("express");
const userRouter = express.Router();
const UserController = require("../controllers/userController");
const AuthController = require("../controllers/authController");

userRouter.get(AuthController.protect, UserController.searchUsers);
userRouter.post("/login", AuthController.login);

userRouter
  .route("/search")
  .get((AuthController.protect, UserController.searchUsers));

userRouter.get("/user-stats", UserController.userStats);
userRouter
  .route("/")
  .post(
    // AuthController.protect,
    // AuthController.restrictTo("MD"),
    UserController.createUser
  )
  .get(
    AuthController.protect,
    AuthController.restrictTo("MD"),
    UserController.getAllUsers
  );

userRouter
  .route("/:id")
  .get(UserController.getUser)
  .patch(UserController.updateUser)
  .delete(UserController.deleteUser);

module.exports = userRouter;
