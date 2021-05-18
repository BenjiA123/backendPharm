const Transaction = require("../model/transactionModel");
const Drug = require("../model/drugModel")
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.getAllTransactions = factory.getAll(Transaction);
exports.getTransaction = factory.getOne(Transaction);

// Chrate transaction with API
exports.createTransaction = factory.createOne(Transaction);

exports.updateTransaction = factory.updateOne(Transaction);

exports.deleteTransaction = factory.deleteOne(Transaction);



exports.createCustomerTransaction = catchAsync(async(req,res,next)=>{
    // There should be at least 1 drug on each transaction
    const document = req.body

    const drugs = await Drug.find({_id: {$in: document.drugs}}).lean().exec();

    let initalQuantity = 0;
    let x = [];
    let totalPrice = 0;

    for (let index = 0; index < drugs.length; index++) {
        const drug = drugs[index];
        initalQuantity = document.quantity[index]
        x.push(initalQuantity * drug.sellingPrice);
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
















// More transaction data functionalities
// exports.getTransactionsStats = catchAsync(async (req, res) => {
//   const stats = Transaction.aggregate([
//     {
//     //   $match: {},
//     },
//   ]);
// });
