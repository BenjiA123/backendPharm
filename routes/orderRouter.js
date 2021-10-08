const express = require("express");
const OrderController = require("../controllers/orderController");

const AuthController = require("../controllers/authController");
const orderRouter = express.Router();

orderRouter
  .use(AuthController.protect, AuthController.restrictTo("MD", "administrator"))
  .route("/")
  .get(OrderController.getAllOrders)
  .post(OrderController.createOrder);
orderRouter
  .use(AuthController.protect, AuthController.restrictTo("MD", "administrator"))
  .route("/:id")
  .get(OrderController.getOrder)
  .patch(OrderController.updateOrder)
  .delete(OrderController.deleteOneOrder);

orderRouter.use(AuthController.protect, AuthController.restrictTo("customer"));

orderRouter.get(
  "/checkout-session/:drugId",
  OrderController.getCheckoutSession
);

orderRouter.get("/my-ordered-drugs", OrderController.getMyOrderedDrug);

module.exports = orderRouter;
