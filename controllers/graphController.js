// Contain aggregate stuff for graphs

const mongoose = require("mongoose");

const Drug = require("../model/drugModel");
const factory = require("./handlerFactory");
const Transaction = require("../model/transactionModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.oneDrugGraph = catchAsync(async (req, res, next) => {
  // The graph should contain the amount of transactions on a particular drug wrt the time period

  //   Get the drug id

  const drugId = req.body.drug;
  if (!drugId) return next(new AppError("Please select a drug", 400));
  const singleDrug = await Transaction.aggregate([
    // Split the drug array
    {
      $unwind: "$drugs",
    },
    //   filter by the drug id

    {
      $match: { "drugs.drug": mongoose.Types.ObjectId(drugId) },
    },

    // group by date and count the results

    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$transactionDate" },
        },
        numTran: { $sum: 1 },
      },
    },
    // {
    //   $lookup: {
    //     from: "Drug",
    //     // localField: "numTran",
    //     // foreignField: "genericName",
    //     as: "inventory_docs",
    //   },
    // },
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
    transStat: {
      result: singleDrug.length,
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
  console.log(req.body.drugs);
  const { startDate, endDate } = req.params;
  const graphData = await Transaction.aggregate([
    {
      $unwind: "$drugs",
    },

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

        drugs: { $push: "$drugs" },
      },
    },

    {
      $addFields: { date: "$_id" },
    },

    {
      $unwind: "$drugs",
    },
    {
      $sort: { date: 1 },
    },

    // {
    //   $group: {
    //     _id: "$drugs",
    //     numTran: { $sum: 1 },
    //     date: { $push: "$date" },
    //   },
    // },

    // {
    //   $match: { _id: mongoose.Types.ObjectId(drugId) },
    // },
    // At this stage there are multiple drugs for multiple dates

    // {
    //   $addFields: { drugID: "$_id" },
    // },
    {
      $project: { _id: 0 },
    },
    // {
    //     // Lookup the drugs Model and get the name of the drug
    //     $lookup:{}
    // },
    // {
    // // Match not working for ID using dates first and grouping by drugId
    // $match:
    // {
    //     drugs:drugId
    // }
    // }
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
