const express = require("express");

const AuthController = require("../controllers/authController");
const DrugController = require("../controllers/drugController");
const ImageController = require("../controllers/imageController");
const drugRouter = express.Router();

drugRouter.use(AuthController.protect);

drugRouter.get("/", DrugController.getAllDrugs);

drugRouter.get("/:id", DrugController.getDrug);

drugRouter.route("/search").get(DrugController.searchDrug);

drugRouter
  .route("/:id")
  .delete(AuthController.restrictTo("MD"), DrugController.deleteDrug);

drugRouter.use(
  AuthController.protect,
  AuthController.restrictTo("MD", "administrator", "pharmacist")
);

drugRouter.route("/get-drug-stats").get(DrugController.getDrugsStats);

// SPECIAL GET ROUTES
drugRouter.route("/available-in-stock").get(DrugController.availagleInStock);
drugRouter
  .route("/available-in-stock-not-expired")
  .get(DrugController.availagleInStockNotExpired);

drugRouter
  .route("/available-in-stock-expired")
  .get(DrugController.availagleInStockExpired);

drugRouter.route("/expired").get(DrugController.expired);

drugRouter.route("/about-to-expire").get(DrugController.almostExpired);

drugRouter.route("/").post(DrugController.saveNewDrug);

drugRouter
  .route("/:id")
  .patch(ImageController.uploadDrugPhoto, DrugController.upDateDrug);

module.exports = drugRouter;
