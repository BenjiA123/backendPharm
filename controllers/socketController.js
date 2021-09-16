const catchAsync = require("../utils/catchAsync");
const Drug = require("../model/drugModel");

exports.searchSocket = catchAsync(async (req, res, next) => {
  const socket = req.app.get("socket");

  let searchQuery = req.query.q;

  const search = await Drug.fuzzySearch(searchQuery);

  await socket.emit("searchResult", search);

  res.status(200).json({
    result: search.length,
    document: {
      data: search,
    },
  });
});
