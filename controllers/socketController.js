const catchAsync = require("../utils/catchAsync");
const Drug = require("../model/drugModel");
const Source = require("../model/sourceModel");
const Chat = require("../model/chatModel");
const APIFeatures = require("../utils/apiFeatures");
const AuthController = require("../controllers/authController");

// exports.searchSocket = catchAsync(async (req, res, next) => {
//   let searchQuery = req.query.q;
//   const socket = req.app.get("socket");

//   res.status(200).json({
//     result: "search.length",
//     // document: {
//     //   data: search,
//     // },
//   });
// });

exports.socket = function (socket) {
  // how can i protect this from un authorized people

  socket.on(
    "searchDrug",
    catchAsync(async function (searchData) {
      const obj = {
        sort: "genericName",
      };
      const features = new APIFeatures(
        Drug.fuzzySearch(searchData),
        obj
      ).sort();

      const drugs = await features.query;

      socket.emit("drugSearchResult", drugs);
    })
  );

  socket.on(
    "getSources",
    catchAsync(async function () {
      const sources = await Source.find();

      socket.emit("sourceResult", sources);
    })
  );

  // Here we have the chat socket

  socket.on(
    "sendDirectMessage",
    catchAsync(async function (messageData) {
      // if (messageData.recieverId == req.user._id) {
      //   return next(new AppError("You cannot send a message to yourself", 400));
      // }

      const document = await Chat.create(messageData);

      socket.emit("messageResult", document);
    })
  );
};
