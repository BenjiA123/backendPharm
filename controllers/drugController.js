const catchAsync = require("../utils/catchAsync");
const Drug = require("../model/drugModel");
const factory = require("./handlerFactory");

exports.availagleInStockExpired = factory.getAll(Drug, {
  available: true,
  expired: true,
});

exports.availagleInStockNotExpired = factory.getAll(Drug, {
  available: true,
  expired: false,
});

exports.availagleInStock = factory.getAll(Drug, { available: true });
exports.expired = factory.getAll(Drug, { expired: true });

// WORK TO BE DONE
exports.almostExpired = factory.getAll(Drug, {
  available: true,
  expired: false,
});

exports.getAllDrugs = factory.getAll(Drug);

exports.saveNewDrug = factory.createOne(Drug);
exports.upDateDrug = factory.updateOne(Drug);

exports.getDrug = factory.getOne(Drug);

exports.searchDrug = catchAsync(async (req, res, next) => {
  let searchQuery = req.query.q;

  const search = await Drug.fuzzySearch(searchQuery);
  res.status(200).json({
    result: search.length,
    document: {
      data: search,
    },
  });
});

// Bulk Editing should be possible
exports.deleteDrug = factory.deleteOne(Drug);

exports.getDrugsStats = catchAsync(async (req, res) => {
  const stats = await Drug.aggregate([
    {
      $group: {
        _id: "$type",
        numDrugs: { $sum: 1 },
        avecostPrice: { $avg: "$sellingPrice" },
        maxcostPrice: { $max: "$sellingPrice" },
        mincostPrice: { $min: "$sellingPrice" },
      },
    },
  ]);
  res.status(200).json({
    status: "sucess",
    data: {
      stats,
    },
  });
});
