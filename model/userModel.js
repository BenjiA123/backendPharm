const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "You must have a username"],
    unique: [true, "This username is already taken"],
    lowercase: true,
  },
  name: {
    type: String,
    required: [true, "Please Tell Us Your Name"],
    unique: false,
  },

  password: {
    type: String,
    required: [true, "You need a password"],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your Password"],
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
    enum: ["MD", "pharmacist", "cachier"],
  },
});

userSchema.index({ username: "text", name: "text" });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 3);
  this.confirmPassword = undefined;
  next();
});

userSchema.pre(/^find/, function(next){
  // this.select('-password')

  next()
})

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
const User = mongoose.model("User", userSchema);
module.exports = User;
