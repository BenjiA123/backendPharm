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

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
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
  // socket.disconnect(logger.logMessage("Socket is disconnected"));
});

server.listen(port, () => {
  logger.logMessage("listening on *:" + port);
});
