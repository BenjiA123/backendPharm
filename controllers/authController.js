const { promisify } = require("util");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../../natours/utils/appError");
const User = require("../model/userModel");

const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign(
    {
      id: id,
    },
    process.env.JWT_SECRETE,
    {
      expiresIn: process.env.JWT_EXPIRES,
    }
  );
};

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new AppError("Please Inpunt an username and password"), 400);
  }

  const user = await User.findOne({ username: username }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Invalid username or password"), 401);
  }

  // I prevented the password from coming up in the response
  user.password =undefined

  const token = signToken(user._id);
  res.status(200).json({
    token,
    user,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new AppError("No token available", 401));
  }
  // Verify Token

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRETE);

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(new AppError("This User no longer Exists", 401));
  }

  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          "You are not permitted to access this resource Contact You MD for further details",
          403
        )
      );
    }
    next();
  };
};
