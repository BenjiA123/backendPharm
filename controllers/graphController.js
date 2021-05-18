// Contain aggregate stuff for graphs

const Drug = require("../model/drugModel");
const factory = require("./handlerFactory");
const Source = require("./../model/sourceModel");
const Transaction = require("../model/transactionModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");



exports.oneDrugGraph = catchAsync(async(req,res,next)=>{

    const drugId = req.params.drugId
    // In the future make it not to be on a daily basis but with a duration given by the user.

    // Get the drug
    const drug =await Drug.findById(drugId)

    await Drug.deleteMany({drugs:undefined})

    // Find all the associated transactions linked to the drug

    const tran = await Transaction.find({drugs:{_id:drugId}})

    // Split the transactions according to the days in whch they were carried out
    const transactionGrouping = await Transaction.aggregate([
        {
            $match:{drugs:{$ne:null}},
        }
      
    ])

    // Collect the data according to the amount collected on a daily basis


    // Send the response out

    res.status(200).json({
        status:'success',transactionGrouping
        // transactions
    })
})




exports.transactionGraph = catchAsync(async(req,res,next)=>{

    res.send("Transaction Graph data")
})

exports.drugGraph = catchAsync(async(req,res,next)=>{

    res.send("Drug Graph data")
})

exports.multipleDrugsOnOneGraph = catchAsync(async(req,res,next)=>{

    res.send("Multiple Drug Graph data")
})


exports.drugsVsAmount = catchAsync(async(req,res,next)=>{

    res.send("Drugs Vs Amount Graph data")
})