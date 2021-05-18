const User = require("../model/userModel");

const factory = require("./handlerFactory");

exports.createUser = factory.createOne(User);

exports.getAllUsers = factory.getAll(User);

exports.searchUsers = factory.search(User)

exports.updateUser = factory.updateOne(User);

exports.getUser = factory.getOne(User);

exports.userStats = factory.stats(User);

exports.deleteUser = factory.deleteOne(User);
