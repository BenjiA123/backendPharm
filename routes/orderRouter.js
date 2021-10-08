const express = require("express");
const OrderController = require("../controllers/orderController");

const AuthController = require("../controllers/authController");
const orderRouter = express.Router();

orderRouter.use(AuthController.protect);

orderRouter
  .route("/")
  .get(
    AuthController.restrictTo("MD", "administrator"),
    OrderController.getAllOrders
  )
  .post(
    AuthController.restrictTo("MD", "administrator"),
    OrderController.createOrder
  );

orderRouter
  .route("/:id")
  // the error
  .patch(
    AuthController.restrictTo("MD", "administrator"),
    OrderController.updateOrder
  )
  .delete(
    AuthController.restrictTo("MD", "administrator"),
    OrderController.deleteOneOrder
  );

orderRouter.get(
  "/checkout-session/:drugId",
  AuthController.restrictTo("customer"),
  OrderController.getCheckoutSession
);

orderRouter.get(
  "/my-ordered-drugs",
  AuthController.restrictTo("customer"),
  OrderController.getMyOrderedDrug
);

orderRouter.get(
  "/my-orders",
  AuthController.restrictTo("customer"),
  OrderController.getMyOrders
);

orderRouter.get(
  "/:id",
  AuthController.restrictTo("MD", "administrator"),
  OrderController.getOrder
);

module.exports = orderRouter;
