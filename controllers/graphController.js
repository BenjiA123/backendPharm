// Contain aggregate stuff for graphs

const mongoose = require("mongoose");

const Drug = require("../model/drugModel");
const factory = require("./handlerFactory");
const Transaction = require("../model/transactionModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.oneDrugGraph = catchAsync(async (req, res, next) => {
  const drugId = req.params.drugId;

  if (!drugId) return next(new AppError("Please select a drug", 400));

  const drug = await Drug.findById(drugId).lean().exec();

  if (!drug) return next(new AppError("This drug does not exist ", 400));

  const { startDate, endDate } = req.params;
  if (!startDate || !endDate)
    return new AppError("Please fill in the dates", 400);

  const singleDrug = await Transaction.aggregate([
    {
      $match: {
        transactionDate: {
          $gte: new Date(`${startDate}`),
          $lte: new Date(`${endDate}`),
        },
      },
    },
    {
      $unwind: "$drugs",
    },
    {
      $match: { "drugs.drug": mongoose.Types.ObjectId(drugId) },
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$transactionDate" },
        },
        numTran: { $sum: 1 },
      },
    },
    {
      $addFields: { transactionDate: "$_id" },
    },

    {
      $project: { _id: 0 },
    },
    {
      $sort: { transactionDate: 1 },
    },
  ]);

  res.status(200).json({
    status: "success",
    result: singleDrug.length,
    drugName: drug.genericName,
    transStat: {
      singleDrug,
    },
  });
});

exports.transactionGraph = catchAsync(async (req, res, next) => {
  // Get the current date and get data by filtering
  const { startDate, endDate } = req.params;
  if (!startDate || !endDate)
    return new AppError("Please fill in the dates", 400);
  // Get transactions
  const graphData = await Transaction.aggregate([
    {
      $match: {
        transactionDate: {
          $gte: new Date(`${startDate}`),
          $lte: new Date(`${endDate}`),
        },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$transactionDate" },
        },
        numTran: { $sum: 1 },
      },
    },
    {
      $addFields: { transactionDate: "$_id" },
    },
    {
      $project: { _id: 0 },
    },
    {
      $sort: { transactionDate: 1 },
    },
  ]);
  // I can query Two Documents one by one, the result g=form the aggregatio
  // Pipeline of one, gives me data for the other

  // This returns all the transactions for every day
  res.status(200).json({
    status: "success",
    transStat: {
      result: graphData.length,
      graphData,
    },
  });
});

exports.drugGraph = catchAsync(async (req, res, next) => {
  // Shows graphs for a selected number of drugs
  res.send("Drug Graph data");
});

exports.multipleDrugsOnOneGraph = catchAsync(async (req, res, next) => {
  // This is meant to be by trans NOTE
  const drugs = req.body.drugs;

  let newDrugs = drugs.map((s) => mongoose.Types.ObjectId(s));

  const { startDate, endDate } = req.params;
  const graphData = await Transaction.aggregate([
    // {
    //   $unwind: "$drugs",
    // },

    {
      $match: {
        transactionDate: {
          $gte: new Date(`${startDate}`),
          $lte: new Date(`${endDate}`),
        },
      },
    },
    {
      $match: {
        "drugs.drug": {
          $in: newDrugs,
        },
      },
    },

    // {
    //   $project: {
    //     test: {
    //       $filter: {
    //         input: req.body.drugs,
    //         as: "num",
    //         cond: {
    //           "$$drugs.drug": { $in: req.body.drugs },
    //         },
    //       },
    //     },
    //   },
    // },

    // {
    //   $group: {
    //     _id: {
    //       $dateToString: { format: "%Y-%m-%d", date: "$transactionDate" },
    //     },

    //     drugs: { $push: "$drugs" },
    //   },
    // },

    // {
    //   $addFields: { date: "$_id" },
    // },

    // {
    //   $unwind: "$drugs",
    // },
    // {
    //   $sort: { date: 1 },
    // },

    // {
    //   $group: {
    //     _id: "$drugs",
    //     numTran: { $sum: 1 },
    //     date: { $push: "$date" },
    //   },
    // },

    // // {
    // //   $match: { _id: mongoose.Types.ObjectId(drugId) },
    // // },
    // // At this stage there are multiple drugs for multiple dates

    // // {
    // //   $addFields: { date: "$date[0]" },
    // // },
    // {
    //   $project: { _id: 0 },
    // },
    // // {
    // //     // Lookup the drugs Model and get the name of the drug
    // //     $lookup:{}
    // // },
    // // {
    // // // Match not working for ID using dates first and grouping by drugId
    // // $match:
    // // {
    // //     drugs:drugId
    // // }
    // // }
  ]);

  res.status(200).json({
    status: "success",
    transStat: {
      result: graphData.length,
      graphData,
    },
  });
});

exports.drugsVsAmount = catchAsync(async (req, res, next) => {
  // Get drug id

  // filter the drug by id

  // get the amount sold and date of trans

  // get that id and get its drug name

  //
  res.send("Drugs Vs Amount Graph data");
});
