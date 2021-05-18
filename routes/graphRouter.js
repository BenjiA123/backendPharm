const express = require("express");

const AuthController = require("../controllers/authController");
const DrugController = require("../controllers/drugController");
const GraphController = require("../controllers/graphController");

const TransactionController = require("../controllers/transactionController");
const graphRouter = express.Router();


graphRouter.use(AuthController.protect,AuthController.restrictTo("MD","admin"))

graphRouter.route("/transaction").get((GraphController.transactionGraph));

graphRouter.route("/drug").get((GraphController.drugGraph));
graphRouter.route("/drug/multiple").get((GraphController.multipleDrugsOnOneGraph));
graphRouter.route("/drug/amount").get((GraphController.drugsVsAmount));
graphRouter.route("/drug/:drugId").get((GraphController.oneDrugGraph));


module.exports = graphRouter;

