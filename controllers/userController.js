const User = require("../model/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

const factory = require("./handlerFactory");

exports.getAllUsers = factory.getAll(User);

exports.searchUsers = factory.search(User);

exports.updateUser = factory.updateOne(User);

exports.getUser = factory.getOne(User);

exports.deleteUser = factory.deleteOne(User);

exports.inactivateUser = catchAsync(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(req.params.userId, {
    active: false,
  });

  if (!document) {
    return next(new AppError(`No document Found this with ID`, 404));
  }

  res.status(204).json({
    status: "success",
    data: "User Successfully Deactivated",
  });
});

exports.userStats = catchAsync(async (req, res, next) => {
  const stats = await User.aggregate([
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
    //   data: {
    //     stats,
    //   },
  });
});

exports.getUserByUsername = catchAsync(async (req, res, next) => {
  const document = await User.findOne({ username: req.params.username });
  if (!document) {
    return next(new AppError("document Not Found with This Id", 404));
  }
  res.status(200).json({
    message: "success",
    data: {
      document,
    },
  });
});
