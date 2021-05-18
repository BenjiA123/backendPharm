const express = require("express");
const SourceController = require("../controllers/sourceController");
const AuthController = require("../controllers/authController");
sourceRouter = express.Router();

sourceRouter
  .route("/search")
  .get( SourceController.searchSources);

sourceRouter
  .route("/")
  .get(
    AuthController.protect,
    AuthController.restrictTo("MD", "pharmacist"),
    SourceController.getAllSources
  )
  .post(
    AuthController.protect,
    AuthController.restrictTo("MD", "pharmacist"),
    SourceController.createSource
  );

sourceRouter
  .route("/:id")
  .get(
    AuthController.protect,
    AuthController.restrictTo("MD", "pharmacist"),
    SourceController.getOneSource
  )
  .patch(
    AuthController.protect,
    AuthController.restrictTo("MD"),
    SourceController.updateSource
  )
  .delete(
    AuthController.protect,
    AuthController.restrictTo("MD"),
    SourceController.deleteSource
  );

module.exports = sourceRouter;
