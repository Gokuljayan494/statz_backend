const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    number: {
      type: String,
      index: true,
    },
    role: {
      type: String,
      enum: ["admin", "user", "shop"],
      default: "user",
    },

    address: {
      type: String,
    },
    images: [{ type: String }],
    shopName: {
      type: String,
    },
    location: {
      type: String,
    },
    pincode: {
      type: String,
    },
    password: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timeStamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.methods.checkPassword = async function (Password, UserPassword) {
  return await bcrypt.compare(Password, UserPassword);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
