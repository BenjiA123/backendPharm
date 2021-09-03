const mongoose = require("mongoose");
const transSchema = new mongoose.Schema({

  purchaseDate: {
    type: Date,
  },
  transactionDate: {
    type: Date,
    dafault:Date.now(),
  },
  totalprice: {
    type: Number,
  },
  customerName: {
    type: String,
  },
  // The drugs should be an array that has a quantity field


  // Can I still populate the drug Field

  drugs:[{type: mongoose.Schema.ObjectId, ref: "Drug"}],

  // drugs: [
  //   {
  //     // drug:{
  //        type: mongoose.Schema.ObjectId, ref: "Drug"
  //       // },

  //   }
  // ],
  quantity:{
    type:[Number], required:true, default:1
  },

  creator:{type:mongoose.Schema.ObjectId,ref:"User"}
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});


// Logic for Changing Quantity
// Use a pre save middleware to populate the drugs documant

transSchema.pre(/^find/,async function (next) {
  this.populate({
    path: "drugs",
    select: "-__v",
  })
  .populate({
    path:'creator'
  })
  next();
});



const Transaction = mongoose.model("Transaction", transSchema);
module.exports = Transaction;
