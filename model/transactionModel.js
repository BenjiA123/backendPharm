const mongoose = require("mongoose");
const transSchema = new mongoose.Schema(
  {
    transactionDate: {
      type: Date,
    },
    totalprice: {
      type: Number,
      required: true,
    },
    customerName: {
      default: "Not Given",
      type: String,
      required: true,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    paymentMethod: {
      type: String,
      default: "cash",
      enum: ["POS", "cash", "transfer"],
      required: [true, "Payment mwthod is required"],
    },

    drugs: [
      {
        drug: {
          type: mongoose.Schema.ObjectId,
          ref: "Drug",
          required: [true, "Drugs is Required"],
        },
        quantity: {
          type: Number,
          required: [true, "Quantity is Required"],
          default: 1,
        },
      },
    ],
    creator: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A creator is Required"],
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    approver: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

transSchema.pre("save", async function (next) {
  this.transactionDate = Date.now();
});

transSchema.pre(/^find/, async function (next) {
  this.populate({
    path: "drugs",
    select: "-__v",
  })
    .populate({
      path: "creator",
    })
    .populate({
      path: "approver",
    });
  next();
});

const Transaction = mongoose.model("Transaction", transSchema);
module.exports = Transaction;
