// Contain aggregate stuff for graphs

const Drug = require("../model/drugModel");
const factory = require("./handlerFactory");
const Transaction = require("../model/transactionModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");



exports.oneDrugGraph = catchAsync(async(req,res,next)=>{

    // The graph should contain the amount sold wrt the time period


    res.send("One Drug Graph data")

   
})




exports.transactionGraph = catchAsync(async(req,res,next)=>{
    // Get the current date and get data by filtering
    const {startDate,endDate}  = req.params
    if(!startDate || !endDate) return new AppError("Please fill in the dates",400)
    // Get transactions 
    const graphData = await Transaction.aggregate([
        {
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
                _id:{$dateToString:{format:"%Y-%m-%d",date:"$transactionDate"}},
                numTran:{$sum:1},
            },           
        },
        {
            $addFields:{transactionDate:'$_id'}
        },
        {
            $project:{ _id:0}
        },   
        {
            $sort:{transactionDate:1}
        }    
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

    // Shows graphs for a selected number of drugs
    res.send("Drug Graph data")
})

exports.multipleDrugsOnOneGraph = catchAsync(async(req,res,next)=>{
    const {startDate,endDate}  = req.params
    const graphData = await Transaction.aggregate([
        // {
        //     $unwind:'$drugs'
        // },
        {
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
                _id:"$drugs",
                // numDrugs:{$sum:1},
                // transDate:{$push:"$transactionDate"}
            }
        },
        // {
        //     $addFields:{drugID:'$_id'}
        // },
        // {
        //     $project:{ _id:0}
        // },
        // {
            // Match not working for ID using dates first and grouping by drugId

            // $match:
            // {
            //     drugs:drugId
            // }
          
        // }
    ])



    res.status(200).json({
        status:'success',
        transStat:{
            result:graphData.length,
            graphData
        }
    })

})


exports.drugsVsAmount = catchAsync(async(req,res,next)=>{

    res.send("Drugs Vs Amount Graph data")
})