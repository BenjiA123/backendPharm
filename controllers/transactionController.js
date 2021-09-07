const Transaction = require("../model/transactionModel");
const Drug = require("../model/drugModel")
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.getAllTransactions = factory.getAll(Transaction);
exports.getTransaction = factory.getOne(Transaction);

// Craate transaction with API
exports.createTransaction = factory.createOne(Transaction);

exports.updateTransaction = factory.updateOne(Transaction);

exports.deleteTransaction = factory.deleteOne(Transaction);



exports.createCustomerPendingTransaction = catchAsync(async(req,res,next)=>{
    // There should be at least 1 drug on each transaction
    const document = req.body

    const drugs = await Drug.find({_id: {$in: document.drugs}}).lean().exec();
    if(!drugs){
        return new AppError("Their are no drugs with this Id", 400)
    }
    let initalDrugQuantity = 0;
    let x = [];
    let totalPrice = 0;

    for (let index = 0; index < drugs.length; index++) {
        const drug = drugs[index];
        initalDrugQuantity = document.quantity[index]
        x.push(initalDrugQuantity * drug.sellingPrice);
        let currentAmount = drug.amount - document.quantity[index]
        // Edited the amount in the drug collection
        await Drug.findByIdAndUpdate(drug._id,{amount:currentAmount})
    }

    for (let index = 0; index < x.length; index++) {
        const num = x[index];
        if((index + 1) < x.length ){
            totalPrice = num + x[index + 1];
        }
    }
    document.totalprice = totalPrice;

    const createdTransaction = await Transaction.create(document);

    res.status(200).json({
      status: "success",
      createdTransaction,
    });
})

exports.createApprovedTransaction = catchAsync(async(req,res,next)=>
{
    const transId = req.params.transactionId
    const approver = req.user._id

    if(!transId) return new AppError("This Transaction hasn't been created", 400)
    if(!approver) return new AppError("The Cachier Or MD needs to Approve this transaction", 400)

    // This response isnt the same with what is in the database.
    // In the data base it works fine
    const approvedTrans = await Transaction.findByIdAndUpdate(transId,{approved:true,approver:approver}).populate('approver').lean().exec();

    res.status(200)
    .json({
        status:"success",
        approvedTrans
    })
})





