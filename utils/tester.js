const mongoose = require("mongoose");
const fs = require("fs");

const Drug = require("../model/drugModel");
mongoose
  .connect("mongodb://localhost:27017/pharmacy", {
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.log(err);
  });

const importData = async () => {
  try {
    const drug = await Drug.find();
    // console.log("DATA LOADED", drug._id);
  } catch (error) {
    console.log(error);
  }
};

importData();
