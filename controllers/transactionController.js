const Transaction = require("../model/transactionModel");
const Drug = require("../model/drugModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const app = require("../app");

exports.getAllTransactions = factory.getAll(Transaction);
exports.getTransaction = factory.getOne(Transaction);

// Craate transaction with API
exports.createTransaction = factory.createOne(Transaction);

exports.updateTransaction = factory.updateOne(Transaction);

exports.deleteTransaction = factory.deleteOne(Transaction);

exports.createCustomerPendingTransaction = catchAsync(
  async (req, res, next) => {
    const document = req.body;
    let initalDrugQuantity = 0;
    let x = [];
    let totalPrice = 0;

    for (let index = 0; index < document.drugs.length; index++) {
      const drug = await Drug.findById(document.drugs[index].drug);

      if (!drug) {
        return next(new AppError("Their are no drugs with this Id", 400));
      }
      initalDrugQuantity = document.drugs[index].quantity;

      x.push(initalDrugQuantity * drug.sellingPrice);
      let currentAmount = drug.amount - document.drugs[index].quantity;

      if (drug.amount == 0 || drug.amount - document.drugs[index].quantity < 0)
        return next(
          new AppError(
            `You do not have enough In Stock for this Transaction `,
            500
          )
        );

      await Drug.findByIdAndUpdate(drug._id, { amount: currentAmount })
        .lean()
        .exec();
    }

    for (let index = 0; index < x.length; index++) {
      const num = x[index];
      if (index + 1 < x.length) {
        totalPrice = num + x[index + 1];
      }
    }
    document.totalprice = totalPrice;
    document.creator = req.user._id;

    const createdTransaction = await Transaction.create(document);
    // Get socket and emit event
    // const socket = req.app.get("socket");
    // console.log(socket);
    // socket.emit("updateTransGraph");

    res.status(200).json({
      status: "success",
      createdTransaction,
    });
  }
);

exports.createApprovedTransaction = catchAsync(async (req, res, next) => {
  const transId = req.params.transactionId;
  const approver = req.user._id;

  if (!transId)
    return next(new AppError("This Transaction hasn't been created", 400));
  if (!approver)
    //This doesnt check if it is the cachier or md
    return next(
      new AppError("The Cachier Or MD needs to Approve this transaction", 400)
    );

  const checkTransStatus = await Transaction.findById(transId).lean().exec();
  if (checkTransStatus.approved)
    return next(
      new AppError(
        `This transaction has been approved by ${checkTransStatus.approver.name}`,
        400
      )
    );
  // I have to do this twice for this to work

  const approvedTrans = await Transaction.findByIdAndUpdate(transId, {
    approved: true,
    approver: approver,
  });
  if (!approvedTrans)
    return next(new AppError("No transaction exists with this id", 400));

  res.status(200).json({
    status: "success",
    approvedTrans,
  });
});
