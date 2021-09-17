const catchAsync = require("../utils/catchAsync");
const Drug = require("../model/drugModel");
const logger = require("../utils/logger");

exports.searchSocket = catchAsync(async (req, res, next) => {
  let searchQuery = req.query.q;
  const socket = req.app.get("socket");

  res.status(200).json({
    result: "search.length",
    // document: {
    //   data: search,
    // },
  });
});

exports.socket = function (socket) {
  socket.on(
    "search",
    catchAsync(async function (searchData) {
      logger.logMessage("Search", searchData);

      const drugs = await Drug.fuzzySearch(searchData);

      socket.emit("searchResult", drugs);
    })
  );
};
