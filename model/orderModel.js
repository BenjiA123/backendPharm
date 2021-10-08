const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  drug: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Drug",
    required: [true, "Orders must have at least a drug"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Orders must have a user"],
  },
  price: { type: Number, required: ["Oders must have a price"] },
  created_at: { type: Date, default: Date.now() },
  // In case a customer paid in the store. An admin can create an order outside stripe
  paid: { type: Boolean, default: true },
});

orderSchema.pre(/^find/, async function (next) {
  this.populate({
    path: "drug",
    select: "genericName brandName",
  }).populate({
    path: "user",
    select: "-loginDates -logoutDates",
  });
  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
