const express = require("express");

const AuthController = require("../controllers/authController");
const GraphController = require("../controllers/graphController");

const TransactionController = require("../controllers/transactionController");
const graphRouter = express.Router();

graphRouter.use(
  AuthController.protect,
  AuthController.restrictTo("MD", "admin")
);

graphRouter
  .route("/transaction/:startDate/:endDate")
  .get(GraphController.transactionGraph);

graphRouter.route("/drug").get(GraphController.drugGraph);
graphRouter
  .route("/drug/multiple/:startDate/:endDate")
  .post(GraphController.multipleDrugsOnOneGraph);
graphRouter.route("/drug/amount").get(GraphController.drugsVsAmount);
graphRouter.route("/drug/:drugId").get(GraphController.oneDrugGraph);

module.exports = graphRouter;
