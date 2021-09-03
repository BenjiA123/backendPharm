// Contain aggregate stuff for graphs

const Drug = require("../model/drugModel");
const factory = require("./handlerFactory");
const Source = require("./../model/sourceModel");
const Transaction = require("../model/transactionModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");



exports.oneDrugGraph = catchAsync(async(req,res,next)=>{

    const drugId = req.params.drugId
    // Get the drug
    const drug =await Drug.findById(drugId).lean().exec()

    // Find all the associated transactions linked to the drug

    const tran = await Transaction.find({drugs:{_id:drugId}}).lean().exec()
    // The graph should contain the amout sold wrt the days

    // Use all the days of the week as a const the only variable is the amount of drugs sold on those days
    const timeFrame = Date.now()- 2*12* 30* 24* 60 * 60 * 1000 //2 years

    const graphData = await Transaction.aggregate([
        {
            $group:{
                _id:'$transactionDate',
                numTran:{$sum:1}
            }
        }
    ])



    res.status(200).json({
        status:'success',
        transStat:{
            graphData,
            // transNumber:tran.length,
            // transaction:tran[0]
        }
    })
})




exports.transactionGraph = catchAsync(async(req,res,next)=>{

    // Get the current date and get data by filtering
    const {startDate,endDate}  = req.params
    console.log(startDate,endDate)

    // Get transactions 
    const graphData = await Transaction.aggregate([

        {
            // gets all transactions within a particular range
            $match:{
                transactionDate:{
                    $gte:new Date(`${startDate}`),
                    $lte:new Date(`${endDate}`)
                }
            }
        },
        {
            $group:
            {
                _id:'$transactionDate',
                numTran:{$sum:1},
            },
           
        },
        {
            $addFields:{transactionDate:'$_id'}
        },
        {
            $project:{ _id:0}
        },
        // {
        //     $limit:5,
            
        // },
        {
            $sort:{numTran:-1}
        },
       
    ])
    // I can query Two Documents one by one, the result g=form the aggregatio 
    // Pipeline of one, gives me data for the other



    // This returns all the transactions for every day
    res.status(200).json({
        status:'success',
        transStat:{
            result:graphData.length,
            graphData
        },
    })
})

exports.drugGraph = catchAsync(async(req,res,next)=>{

    // Shows all drugs
    res.send("Drug Graph data")
})

exports.multipleDrugsOnOneGraph = catchAsync(async(req,res,next)=>{

    res.send("Multiple Drug Graph data")
})


exports.drugsVsAmount = catchAsync(async(req,res,next)=>{

    res.send("Drugs Vs Amount Graph data")
})