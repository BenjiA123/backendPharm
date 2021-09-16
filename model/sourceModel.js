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
  // When creating a vendor, do you need drugs?????
  // drugs:[
  //   { drug:{type:mongoose.Schema.ObjectId,ref:"Drug", required:[true,"Drugs is Required for a source"]},
  //   quantity:{type:Number}
  
  // },

  // ]
});
sourceSchema.index({ name: "text" });

const Source = mongoose.model("Source", sourceSchema);
module.exports = Source;
