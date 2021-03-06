const express = require("express");
const userRouter = express.Router();
const UserController = require("../controllers/userController");
const AuthController = require("../controllers/authController");

userRouter.get("/get-logged-in-user", AuthController.sendLogginData);

userRouter.post("/customer", AuthController.createUser);

userRouter.post(
  "/create-password/:resetToken",
  AuthController.verifyCreatedUserAndCreatePassword
);

userRouter.get(
  "/:username",
  AuthController.protect,
  AuthController.restrictTo("MD"),
  UserController.getUserByUsername
);

userRouter.get(AuthController.protect, UserController.searchUsers);
userRouter.post("/login", AuthController.login);
userRouter.post("/logout", AuthController.protect, AuthController.logout);

userRouter
  .route("/search")
  .get((AuthController.protect, UserController.searchUsers));

userRouter.get("/user-stats", UserController.userStats);
userRouter
  .route("/")
  .post(
    AuthController.protect,
    AuthController.restrictTo("MD"),
    AuthController.createUser
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

userRouter.delete("/inactivate/:userId", UserController.inactivateUser);

module.exports = userRouter;
