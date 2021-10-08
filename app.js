const express = require("express");
const app = express();
const path = require("path");
const helmet = require("helmet");
const csurf = require("csurf");

const rateLimit = require("express-rate-limit");

var cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const globalErrorHandler = require("./controllers/errorController");
const orderController = require("./controllers/orderController");

const userRouter = require("./routes/userRouter");
const socketRouter = require("./routes/socketRouter");
const graphRouter = require("./routes/graphRouter");
const drugRouter = require("./routes/drugRouter");
const transRouter = require("./routes/transactionRouter");
const sourceRouter = require("./routes/sourceRouter");
const chatRouter = require("./routes/chatRouter");
const orderRouter = require("./routes/orderRouter");

const AppError = require("./utils/AppError");

app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

const csrfMiddleware = csurf({
  cookie: true,
});

app.enable("trust proxy");
app.post(
  "/webhook-checkout",
  express.raw({ type: "application/json" }),
  orderController.webhookCheckout
);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false, limit: "10kb" }));

app.use(cookieParser());
// app.use(csrfMiddleware);

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 100,
  message: "Too many req from this IP, wait for an hour",
});

app.use("/api", limiter);

app.use(
  cors({
    origin: [
      "http://127.0.0.1:4200",
      "http://localhost:4200",
      "https://gileadpharmacy.herokuapp.com/#",
    ],
    credentials: true,
  })
);

app.options(
  "*",
  cors({
    origin: [
      "http://127.0.0.1:4200",
      "http://localhost:4200",
      "https://gileadpharmacy.herokuapp.com",
    ],
    credentials: true,
  })
);

app.use("", express.static(path.join(__dirname, "public")));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/socket", socketRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/drug", drugRouter);
app.use("/api/v1/graph", graphRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/source", sourceRouter);
app.use("/api/v1/transaction", transRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this Server!!`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
