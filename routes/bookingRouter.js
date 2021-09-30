const express = require("express");
const BookingController = require("../controllers/bookingController");

const AuthController = require("../controllers/authController");
const bookingRouter = express.Router();

bookingRouter.use(
  AuthController.protect
  //   Restrict to only customers later
  //   AuthController.restrictTo("customer")
);

bookingRouter.get(
  "/checkout-session/:drugId",
  BookingController.getCheckoutSession
);

module.exports = bookingRouter;
