const dotenv = require("dotenv");
const mongoose = require("mongoose");
const fs = require("fs");
const Drug = require("./model/drugModel");
const Transaction = require("./model/transactionModel");

dotenv.config({ path: "./config.env" });
mongoose
  .connect("mongodb://localhost:27017/pharmacy", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.log(err);
  });

const transactions = JSON.parse(
  fs.readFileSync(`${__dirname}/dummydata/trans_data_few.json`, "utf-8")
);

const importData = async () => {
  try {
    await Transaction.create(transactions, { validateBeforeSave: false });
    console.log("DATA LOADED");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};
const deleteData = async () => {
  try {
    await Transaction.deleteMany({drugs:null});
    console.log("DATA DELETED");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
