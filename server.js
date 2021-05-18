const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const logger = require("./utils/logger");

const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app");

mongoose
  .connect(process.env.LOCAL_DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.logMessage("Connected to database");
    logger.logMessage(process.env.NODE_ENV);
  })
  .catch((err) => {
    logger.logError("Error : ", err);
  });

const server = app.listen(port, () => {});

// MD
// {
//     "username":"Akintpiio123 033",
//     "password":"1234567"
// }

// pharmacist
// {
//     "username":"akintpiio12",
//     "password":"1234567"
// }

// cachier
// { "username":"A kin tpiio 123 033",
//     "password":"1234567"}
