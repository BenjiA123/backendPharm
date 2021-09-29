const mongoose = require("mongoose");
const mongooseFuzzySearching = require("mongoose-fuzzy-searching");
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
      enum: ["tablet", "suspension", "injectible"],
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
      // Purchase dates should be an array because they purchase drugs multiple times
      type: Date,
    },
    expiryDate: {
      type: Date,
      required: true,
    },

    drugImage: {
      type: String,
      required: true,
      default: "default.jpg",
    },
    amount: {
      type: Number,
    },
    description: {
      type: String,
      default: "This is a good drug",
    },
    // Each time you create a drug, you have one sorurce
    sources: {
      type: mongoose.Schema.ObjectId,
      ref: "Source",
      required: [true, "Every drug needs a source"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
drugSchema.index({ genericName: "text" });

drugSchema.pre("save", function (next) {
  this.purchaseDate = Date.now();
  next();
});

drugSchema.pre(/^find/, async function (next) {
  this.populate({ path: "sources", select: "-__v" });
  next();
});
drugSchema.virtual("almostExpired").get(function () {
  return Date.now() - this.expiryDate < 30;
});

drugSchema.virtual("almostFinished").get(function () {
  return this.amount < 10;
});

drugSchema.virtual("available").get(function () {
  return this.amount > 0;
});

drugSchema.virtual("expired").get(function () {
  return this.expiryDate - Date.now() < 0;
});

drugSchema.plugin(mongooseFuzzySearching, { fields: ["genericName"] });

const Drug = mongoose.model("Drug", drugSchema);

module.exports = Drug;
