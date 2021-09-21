const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const customerSchema = new mongoose.Schema({
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

  address: {
    type: String,
    required: [true, "Please input an address"],
  },

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
    default: "customer",
  },

  token: { type: String },
  tokenExpires: { type: Date },

  active: {
    type: Boolean,
    required: true,
    default: true,
  },
});

customerSchema.index({ name: "text" });

customerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 3);
  this.confirmPassword = undefined;
  next();
});

customerSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

customerSchema.methods.createToken = async function () {
  const token = crypto.randomBytes(32).toString("hex");
  this.token = crypto.createHash("sha256").update(token).digest("hex");

  this.tokenExpires = Date.now() + 10 * 60 * 1000;
  return token;
};
const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
