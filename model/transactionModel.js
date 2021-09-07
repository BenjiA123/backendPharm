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
  approved:{
    type:Boolean,
    default:false,
    
  },

  drugs:[{type: mongoose.Schema.ObjectId, ref: "Drug"}],

  quantity:{
    type:[Number], required:true, default:1
  },

  creator:{type:mongoose.Schema.ObjectId,ref:"User"},
  approver:{
    type:mongoose.Schema.ObjectId,ref:"User",
    default:null}
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});



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
