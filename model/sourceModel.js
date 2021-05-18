const mongoose = require("mongoose");

const sourceSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Every source needs a name"],
  },
  address: {
    type: String,
    required: [true, "Please fill in the Address"],
  },
  purchaseDate: {
    type: Date,
    required: [true, "Please Input The purchase date"],
  },
});
sourceSchema.index({ name: "text" });

const Source = mongoose.model("Source", sourceSchema);
module.exports = Source;
