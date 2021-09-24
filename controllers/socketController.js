const catchAsync = require("../utils/catchAsync");
const Drug = require("../model/drugModel");
const Source = require("../model/sourceModel");

const APIFeatures = require("../utils/apiFeatures");

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
};
