const express = require("express");
const app = express();
var cors = require('cors')
const cookieParser = require('cookie-parser')
const globalErrorHandler = require("./controllers/errorController");

const userRouter = require("./routes/userRouter");
const graphRouter = require("./routes/graphRouter");
const drugRouter = require("./routes/drugRouter");
const transRouter = require("./routes/transactionRouter");
const sourceRouter = require("./routes/sourceRouter");
const AppError = require("./utils/appError");

// app.use(cors())
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser())


app.use((req, res, next) => {
  const allowedOrigins = ['http://127.0.0.1:4200', 'http://localhost:4200'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});























// app.use(cors());
// // Adding Options
// app.use(cors({
//   origin:['http://localhost:4200']
// }))
// // Non Simple requests
// app.options(['http://localhost:4200'], cors());
// // Adding Options
// app.options(cors({
//   origin:['http://localhost:4200']
// }))


// app.use((req,res,next)=>{


//   res.setHeader("Access-Control-Allow-Origin", ["http://localhost:4200"]);
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin,X-Requested-With,Content-Type,Accept,Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET ,POST,PUT,PATCH,DELETE,OPTIONS"
//   );
//   res.setHeader("Access-Control-Allow-Credentials",true)

// next()
// })


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
