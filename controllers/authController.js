const { promisify } = require("util");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const User = require("../model/userModel");
const crypto = require("crypto");

const jwt = require("jsonwebtoken");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const Email = require("../utils/email");

const createSendToken = (user, statusCode, req, res,next) => {
  const token = signToken(user._id);

if(!token) return next(new AppError("Their was no token sent",400))


  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: req.secure || req.headers['x-forwarded-proto'] == 'https',
    httpOnly: false,
  };

  // if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  // if (req.secure || req.headers['x-forwarded-proto'] == 'https') cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "sucess",
    token,
    user,
  });
};

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

  let user = await User.findOne({ username: username }).select("+password");
  if(!user)  user = await User.findOne({email:username}).select("+password")

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Invalid username or password"), 401);
  }

  // Meant to store loggin dates
  user.loginDates.push(new Date(Date.now()));
  await user.save({ validateBeforeSave: false });

  // I prevented the password from coming up in the response
  user.password = undefined;
  user.confirmPassword = undefined;

  createSendToken(user, 201, req,res,next);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
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

exports.sendLogginData = catchAsync(async (req, res, next) => {
  if (!req.cookies.jwt) {
    next(new AppError("No token in cookie is Available"), 400);
  }

  const decoded = await promisify(jwt.verify)(
    req.cookies.jwt,
    process.env.JWT_SECRETE
  );

  const currentUser = await User.findById(decoded.id).select(
    "-password -confirmPassword"
  );

  if (!currentUser) {
    return next(new AppError("This user doesn't Exits", 304));
  }

  res.status(200).json({
    status: "success",
    user: currentUser,
  });
});

exports.createUser = catchAsync(async (req, res, next) => {

  // Create the user
  // Instead of creating the user i can just send them an email directly
  const user = await User.create(req.body);

  // createreset Token
  const resetToken = await user.createToken();
  await user.save({ validateBeforeSave: false });

  // Send Email with the token

  // The token sent should serve an angular Page

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/#/auth/create-password/${resetToken}`;
  try {
    await new Email(user, resetUrl).sendWelcome();
    res.status(200).json({
      status: "success",
      message: "Token has been sent to Your Email😊",
    });
  } catch (error) {
    user.token = undefined;
    user.tokenExpires = undefined;
    user.save({ validateBeforeSave: false });
    return next(
      new AppError(
        "Their was an error sending this email. Try again later",
        500
      )
    );
  }
});

exports.verifyCreatedUserAndCreatePassword = catchAsync(
  async (req, res, next) => {


    if(!req.body.password || !req.body.confirmPassword) return next(new AppError("Please fill the required fields", 400));

    // Get token from params
    const createToken = req.params.resetToken;
    const hashedToken = crypto
      .createHash("sha256")
      .update(createToken)
      .digest("hex");

    // Compare token and Token Expires with the one in database
    const user = await User.findOne({
      token: hashedToken,
      tokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      // If the token has expired of theeir is no user or no token delete this user
      // This gives a little error in development
      // await User.findByIdAndDelete(user._id)
      delete user
      return next(new AppError("Token is Invalid or has expired, contact your MD", 400));
    }
    // Get password and Password Confirm from req.body
      
      if(req.body.password != req.body.confirmPassword) return next(new AppError("Password and Password confirm must be the same", 400));
      user.confirmPassword = req.body.confirmPassword;
    user.password = req.body.password;
    user.verified = true;
    user.token = undefined;
    user.tokenExpires = undefined;

    await user.save();

    // Log user in with JWT
    createSendToken(user, 200, req, res,next);
  }
);

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

exports.logout = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.body.user.currentUser._id);
  if (!user) return new AppError("No user was logged in", 400);

  res.cookie("jwt", "logout", {
    expires: new Date(Date.now() + 10),
    httpOnly: false,
  });
  user.logoutDates.push(new Date(Date.now()));

  user.save({ validateBeforeSave: false });
  res.status(200).json({
    status: "success",
  });
});
