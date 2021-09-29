const express = require("express");

const AuthController = require("../controllers/authController");
const DrugController = require("../controllers/drugController");
const ImageController = require("../controllers/imageController");
const drugRouter = express.Router();

drugRouter
  .route("/search")
  .get((AuthController.protect, DrugController.searchDrug));

drugRouter
  .route("/get-drug-stats")
  .get(
    AuthController.protect,
    AuthController.restrictTo("MD", "pharmacist"),
    DrugController.getDrugsStats
  );

// SPECIAL GET ROUTES
drugRouter
  .route("/available-in-stock")
  .get(
    AuthController.protect,
    AuthController.restrictTo("MD", "pharmacist"),
    DrugController.availagleInStock
  );
drugRouter
  .route("/available-in-stock-not-expired")
  .get(
    AuthController.protect,
    AuthController.restrictTo("MD", "pharmacist"),
    DrugController.availagleInStockNotExpired
  );

drugRouter
  .route("/available-in-stock-expired")
  .get(
    AuthController.protect,
    AuthController.restrictTo("MD", "pharmacist"),
    DrugController.availagleInStockExpired
  );

drugRouter
  .route("/expired")
  .get(
    AuthController.protect,
    AuthController.restrictTo("MD", "pharmacist"),
    DrugController.expired
  );

drugRouter
  .route("/about-to-expire")
  .get(
    AuthController.protect,
    AuthController.restrictTo("MD", "pharmacist"),
    DrugController.almostExpired
  );

drugRouter
  .route("/")
  .get(
    AuthController.protect,
    AuthController.restrictTo("MD", "pharmacist"),
    DrugController.getAllDrugs
  )
  .post(
    AuthController.protect,
    AuthController.restrictTo("MD", "pharmacist"),
    DrugController.saveNewDrug
  );

drugRouter
  .route("/:id")
  .get(
    AuthController.protect,
    AuthController.restrictTo("MD", "pharmacist"),
    DrugController.getDrug
  )
  .patch(
    AuthController.protect,
    AuthController.restrictTo("MD", "pharmacist"),
    ImageController.uploadDrugPhoto,
    DrugController.upDateDrug
  )
  .delete(
    AuthController.protect,
    AuthController.restrictTo("MD"),
    DrugController.deleteDrug
  );

module.exports = drugRouter;
