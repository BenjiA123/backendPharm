const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "You must have a username"],
    unique: [true, "This username is already taken"],
    lowercase: true,
    validate: {
      validator: function (el) {
        return el === el.split(" ").join("");
      },
      message: "No spaces are allowed",
    },
  },
  name: {
    type: String,
    required: [true, "Please Tell Us Your Name"],
    unique: false,
  },

  email: {
    type: String,
    unique: [true, "This email is already taken"],
    required: [true, "Please fill in your email"],
  },
  phoneNumber: {
    unique: [true, "This phone number is already taken"],
    // Not Working
    minlength: 5,
    type: Number,
    required: [true, "Please fill in your phone number"],
  },

  gender: {
    type: String,
    required: [true, "Please fill in your Gender"],
    enum: ["male", "female"],
  },

  dateOfBirth: {
    type: Date,
    required: [true, "Please fill in your Date of Birth"],
  },

  loginDates: {
    type: [Date],
    select: true,
  },

  logoutDates: {
    type: [Date],
    select: true,
  },

  // address,

  password: {
    type: String,
    required: [true, "You need a password"],
    select: false,
    default: "12345678",
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your Password"],
    default: "12345678",

    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!!",
    },
  },
  role: {
    type: String,
    default: "pharmacist",
    enum: ["MD", "pharmacist", "cachier", "administrator", "customer"],
  },

  token: { type: String },
  tokenExpires: { type: Date },

  active: {
    type: Boolean,
    required: true,
    default: true,
  },
});

userSchema.index({ username: "text", name: "text" });

userSchema.pre(/^find/, async function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.pre("save", async function (next) {
  // this.password = "12345678"
  // this.confirmPassword = "12345678"

  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 3);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createToken = async function () {
  const token = crypto.randomBytes(32).toString("hex");
  this.token = crypto.createHash("sha256").update(token).digest("hex");

  this.tokenExpires = Date.now() + 10 * 60 * 1000;
  // console.log("Token on database",this.token)
  return token;
};
const User = mongoose.model("User", userSchema);
module.exports = User;
