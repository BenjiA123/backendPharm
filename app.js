const express = require("express");
const app = express();
const path = require("path");

var cors = require("cors");
const cookieParser = require("cookie-parser");

const globalErrorHandler = require("./controllers/errorController");

const userRouter = require("./routes/userRouter");
const socketRouter = require("./routes/socketRouter");
const graphRouter = require("./routes/graphRouter");
const drugRouter = require("./routes/drugRouter");
const transRouter = require("./routes/transactionRouter");
const sourceRouter = require("./routes/sourceRouter");

const AppError = require("./utils/AppError");

app.enable("trust proxy");

app.use("", express.static(path.join(__dirname, "public")));

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://127.0.0.1:4200", "http://localhost:4200"],
    credentials: true,
  })
);

app.options(
  "*",
  cors({
    origin: ["http://127.0.0.1:4200", "http://localhost:4200"],
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/socket", socketRouter);
app.use("/api/v1/drug", drugRouter);
app.use("/api/v1/graph", graphRouter);
app.use("/api/v1/source", sourceRouter);
app.use("/api/v1/transaction", transRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this Server!!`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
