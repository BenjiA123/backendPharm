const { promisify } = require("util");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../model/userModel");

const jwt = require("jsonwebtoken");


const createSendToken = (user, statusCode, res)=>{
  const token = signToken(user._id)
  const cookieOptions = {
    expires:new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN *24 *60 *60 *1000),
    secure: false,
    httpOnly:false
  }

  if(process.env.NODE_ENV === 'production') cookieOptions.secure = true
  res.cookie('jwt',token,cookieOptions )

  res.status(statusCode).json({
    status:"sucess",
    token,
    user,
  });
}

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
  createSendToken(user,201,res)

});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  else if(req.cookies.jwt)
  {token = req.cookies.jwt
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
  if(!req.cookies.jwt)
  {
    next(new AppError("No token in cookie is Available"),400);

  }

  const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETE);

  const currentUser = await User.findById(decoded.id).select('-password -confirmPassword');

  if (!currentUser) {
    return next(new AppError("This user doesn't Exits",304));
  }

   res.status(200)
   .json({
     status:"success",
     user :currentUser
   })
  

});


exports.createUser =   catchAsync(async (req, res) => {

  // createreset Token

  // Send Email with the token

  const document = await User.create(req.body);
  res.status(200).json({
    status: "success",
    document,
  });
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
