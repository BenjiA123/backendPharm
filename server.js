process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION  Exiting...😢😢😢");
  console.log(err.name, err.message, err);
  process.exit(1);
});

const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const logger = require("./utils/logger");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

const socketController = require("./controllers/socketController");

// if (process.env.NODE_ENV == "production") {
const DB = process.env.ONLINE_DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
// }

mongoose
  // LOCAL_DATABASE
  .connect(DB, {
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

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const { search } = require("./controllers/handlerFactory");
const io = new Server(server, {
  cors: {
    origin: ["http://127.0.0.1:4200", "http://localhost:4200"],
    methods: ["GET", "POST"],
    // allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  logger.logMessage("Socket Connection Established");
  app.set("socket", socket);
  socketController.socket(socket);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const serverDetail = server.listen(port, () => {
  logger.logMessage("listening on *:" + port);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message, err);
  console.log("UNHANDLED REJECTION Shutting DOWn...👌👌😒");
  serverDetail.close(() => {
    process.exit(1);
  });
});
