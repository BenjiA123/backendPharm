const mongoose = require("mongoose");
const drugSchema = new mongoose.Schema(
  {
    genericName: {
      type: String,
      required: [true, "Every drug needs a Generic name"],
      // unique: true,
    },
    brandName: {
      type: String,
      required: [true, "Every drug needs to have a Brand Name"],
      // unique: true,
    },
    type: {
      type: String,
      enum: ["1", "2", "3"],
      required: true,
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
    costPrice: {
      type: Number,
    },
    purchaseDate: {
      type: Date,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    expired: {
      type: Boolean,
      default: false,
    },
    available: {
      type: Boolean,
      default: true,
    },
    amount: {
      type: Number,
    },
    sources: [{ type: mongoose.Schema.ObjectId, ref: "Source" }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
drugSchema.index({ genericName: "text" });

drugSchema.pre("save", function (next) {
  if (this.type == "1") {
    this.type = "tablet";
  } else if (this.type == "2") {
    this.type = "suspension";
  } else if (this.type == "3") {
    this.type = "injectible";
  }
  this.purchaseDate = Date.now();
  this.available = this.amount > 0;
  this.expired = this.expiryDate - this.purchaseDate < 0;
  next();
});

drugSchema.pre(/^find/, async function (next) {
  this.populate({ path: "sources", select: "-__v" });
  next();
});
drugSchema.virtual("almostExpired").get(function () {
  return Date.now() >= this.expiryDate - 30;
});

drugSchema.methods.updateQuantity = async function (quantity, drugId) {
  console.log(quantity, drugId);
};


const Drug = mongoose.model("Drug", drugSchema);

module.exports = Drug;
