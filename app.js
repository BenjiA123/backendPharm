const express = require("express");
const app = express();
var cors = require('cors')
const globalErrorHandler = require("./controllers/errorController");

const userRouter = require("./routes/userRouter");
const graphRouter = require("./routes/graphRouter");
const drugRouter = require("./routes/drugRouter");
const transRouter = require("./routes/transactionRouter");
const sourceRouter = require("./routes/sourceRouter");
const AppError = require("./utils/appError");

app.use(cors())
app.use(express.json({ limit: "10kb" }));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/drug", drugRouter);
app.use("/api/v1/graph", graphRouter);
app.use("/api/v1/source", sourceRouter);
app.use("/api/v1/transaction", transRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this Server!!`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
