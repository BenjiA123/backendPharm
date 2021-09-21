const express = require("express");
const transRouter = express.Router();
const AuthController = require("../controllers/authController");
const TransactionController = require("../controllers/transactionController");

transRouter
  .route("/")
  .get(
    AuthController.protect,
    AuthController.restrictTo("MD", "cachier"),
    TransactionController.getAllTransactions
  )
  .post(
    AuthController.protect,
    AuthController.restrictTo("MD", "cachier"),
    TransactionController.createCustomerPendingTransaction
  );

transRouter
  .route("/approve/:transactionId")
  .get(
    AuthController.protect,
    AuthController.restrictTo("MD", "cachier"),
    TransactionController.createApprovedTransaction
  );

transRouter
  .route("/:id")
  .get(
    AuthController.protect,
    AuthController.restrictTo("MD", "cachier"),
    TransactionController.getTransaction
  )
  .patch(
    AuthController.protect,
    AuthController.restrictTo("MD"),
    TransactionController.updateTransaction
  )
  .delete(
    AuthController.protect,
    AuthController.restrictTo("MD"),
    TransactionController.deleteTransaction
  );

module.exports = transRouter;
