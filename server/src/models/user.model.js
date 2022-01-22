const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  passportID: {
    type: Number,
    unique: [true, "a user with this passport ID already exists"],
    dropDups: true,
    required: [true, "passport ID is required"],
    validate: {
      validator: (val) => val.toString().length === 9,
      message: `Passport ID must be 9 digits`,
    },
  },
  cash: {
    type: Number,
    default: 0,
  },
  credit: {
    type: Number,
    min: [0, "credit must be a positive amount"],
    default: 0,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
