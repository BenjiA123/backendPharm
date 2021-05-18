const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/AppError");

exports.search = (Model) =>
  catchAsync(async (req, res, next) => {
    let searchQuery = req.query.q;

    let searchObj = { $text: { $search: searchQuery } };
    if (!searchQuery) searchObj = {};

    const search = await Model.find(searchObj);
    res.status(200).json({
      result: search.length,
      document: {
        data: search,
      },
    });
  });

exports.getAll = (Model, filterOptions) =>
  catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Model.find(filterOptions), req.query)
      .sort()
      .filter()
      .limit()
      .paginate()
      .type();

    const document = await features.query;

    res.status(200).json({
      message: "Success",
      result: document.length,
      data: {
        document,
      },
    });
  });

exports.getOne = (Model, options) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findById(req.params.id);
    if (!document) {
      return next(new AppError("document Not Found with This Id", 404));
    }
    res.status(200).json({
      message: "success",
      data: {
        document,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res) => {
    const document = await Model.create(req.body);
    res.status(200).json({
      status: "success",
      document,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      // Permits validators to update Documents
      runValidators: true,
    });

    if (!document) {
      return next(new AppError("Model Not Found with This Id", 404));
    }

    res.status(200).json({
      data: {
        status: "success",
        document: document,
      },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);

    if (!document) {
      return next(new AppError(`No document Found this with ID`, 404));
    }

    res.status(204).json({
      status: "success",
      data: "Document Successfully Deleted",
    });
  });

exports.stats = (Model) =>
  catchAsync(async (req, res,next) => {
    const stats = await Model.aggregate([
      {
        $group: {
          _id: "$type",
          numDrugs: { $sum: 1 },
          avecostPrice: { $avg: "$sellingPrice" },
          maxcostPrice: { $max: "$sellingPrice" },
          mincostPrice: { $min: "$sellingPrice" },
        },
      },
    ]);

    res.status(200).json({
      status: "sucess",
      data: {
        stats,
      },
    });
  });
