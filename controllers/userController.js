const User = require("../model/userModel");
const catchAsync = require("../utils/catchAsync");

const factory = require("./handlerFactory");

exports.createUser = factory.createOne(User);

exports.getAllUsers = factory.getAll(User);

exports.searchUsers = factory.search(User)

exports.updateUser = factory.updateOne(User);

exports.getUser = factory.getOne(User);

exports.deleteUser = factory.deleteOne(User);
exports.userStats =  catchAsync(async (req, res,next) => {
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

