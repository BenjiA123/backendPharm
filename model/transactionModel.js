const mongoose = require("mongoose");
const transSchema = new mongoose.Schema({
  // type: {
  //   type: String,
  //   default: "purchase",
  // },
  purchaseDate: {
    type: Date,
  },
  transactionDate: {
    type: Date,
    dafault:null,
  },
  quantity: {
    type: [Number],
  },
  totalprice: {
    type: Number,
  },
  customerName: {
    type: String,
  },
  drugs: [{ type: mongoose.Schema.ObjectId, ref: "Drug" }],
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

transSchema.pre('save',function(next){
  
  this.transactionDate = Date.now()
  next()
})

// transSchema.virtual("totalPrice").get(function () {
//   const drug = 
//   return this.price * this.quantity[0];
// });

const Transaction = mongoose.model("Transaction", transSchema);
module.exports = Transaction;
