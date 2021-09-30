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

const userRouter = require("./routes/userRouter");
const socketRouter = require("./routes/socketRouter");
const graphRouter = require("./routes/graphRouter");
const drugRouter = require("./routes/drugRouter");
const transRouter = require("./routes/transactionRouter");
const sourceRouter = require("./routes/sourceRouter");
const chatRouter = require("./routes/chatRouter");
const bookingRouter = require("./routes/bookingRouter");

const AppError = require("./utils/AppError");

app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

const csrfMiddleware = csurf({
  cookie: true,
});

app.enable("trust proxy");

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
      "https://gileadpharmacy.herokuapp.com",
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

const Drug = require("./model/drugModel");
const Trans = require("./model/transactionModel");

app.get("/test", async (req, res, next) => {
  try {
    const drug = await Drug.aggregate([
      {
        $group: {
          _id: null,
          num: { $sum: 1 },
          drugIds: { $push: "$_id" },
        },
      },
    ]);

    const drugsIdArray = drug[0].drugIds;

    let x = [];

    const dates = [
      "2021-09-07",
      "2021-09-08",
      "2021-09-10",
      "2021-09-11",
      "2021-09-12",
      "2021-09-13",
      "2021-09-14",
      "2021-09-15",
      "2021-09-16",
      "2021-09-17",
      "2021-09-18",
      "2021-09-20",
      "2021-09-21",
      "2021-09-22",
      "2021-09-23",
      "2021-09-25",
      "2021-09-26",
    ];
    for (let i = 0; i < 100; i++) {
      const numDrugs = Math.floor(Math.random() * 7);

      for (let i = 0; i < numDrugs; i++) {
        const randomDrugId = Math.floor(Math.random() * drug[0].drugIds.length);
        const randomDate = Math.floor(Math.random() * dates.length);

        const trans = {
          drugs: [
            { drug: drugsIdArray[randomDrugId], quantity: randomDrugId + 1 },
          ],
          customerName: "customer",
          creator: "613ba33792af3f583445a41c",
          totalprice: 2345,
          transactionDate: dates[randomDate],
        };
        x.push(trans.drugs);
        await Trans.create(trans);
      }
    }

    res.status(200).json({ result: "Success" });
  } catch (error) {}
});
app.use("", express.static(path.join(__dirname, "public")));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/socket", socketRouter);
app.use("/api/v1/booking", bookingRouter);
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
