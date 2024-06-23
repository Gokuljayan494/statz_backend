const User = require("../Model/UserModel");
const { message } = require("../utils/constants");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/email");
const Business = require("../Model/businessModel");
const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;

const generateOtp = function (length) {
  return Math.floor(Math.random() * Math.pow(10, length))
    .toString()
    .padStart(length, "0");
};

const generateToken = function (id) {
  return jwt.sign({ id }, process.env.USER_SECRET_KEY, {
    expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
  });
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email);
    console.log(password);
    if (!email || !password) throw new Error(message.required_fields);

    let user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.checkPassword(password, user.password))) {
      console.log(`-------------`);
      console.log(`here`);
      throw new Error(message.INVALID_USER);
    }
    id = user.id;
    const token = generateToken(id);
    res.status(200).json({
      status: message.SUCESS_MESSAGE,
      statusMessage: message.USER_LOGGED_SUCCESS,
      token: {
        access_token: token,
        token_type: message.BEARER,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: message.FAIL_MESSAGE,
      message: `${message.ERROR} :${err.message} `,
    });
  }
};

exports.sendLoginOtp = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email });
    }

    const otp = await generateOtp(6);
    user.password = otp;
    await user.save();

    // Send response immediately after saving the OTP
    const result = {
      otp,
      message: "OTP generated successfully",
    };
    const mailOptions = {
      from: "gokuljayan494@gmail.com",
      to: email,
      subject: "Login OTP",
      text: `Your OTP is ${otp}`,
      html: `<b>Your OTP is ${otp}</b>`,
    };

    res.status(200).json({ status: "Success", result });
    await sendMail(mailOptions);

    // Send the email asynchronously
  } catch (err) {
    res.status(400).json({ status: "Fail", message: `${err.message}` });
  }
};

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate the request
    if (!email || !password) {
      throw new Error(message.required_fields);
    }

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      throw new Error(message.USER_ALREADY_EXISTS);
    }

    // Hash the password

    // Create the new user
    user = new User({
      email,
      password,
    });

    // Save the user to the database
    await user.save();

    // Generate a token for the user
    const token = generateToken(user.id);

    // Send the success response
    res.status(201).json({
      status: message.SUCESS_MESSAGE,
      statusMessage: message.USER_CREATED_SUCCESS,
      token: {
        access_token: token,
        token_type: message.BEARER,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: message.FAIL_MESSAGE,
      message: `${message.ERROR} :${err.message} `,
    });
  }
};

exports.userDetails = async (req, res) => {
  try {
    console.log(`-------------`);
    const user = req.user;

    const currentUser = await User.findById(user);

    const business = await Business.aggregate([
      { $match: { userId: new ObjectId(user), active: true } },
    ]);

    const result = { user: currentUser, business };

    res.status(200).json({ status: "Success", data: result });
  } catch (err) {
    res.status(400).json({
      status: message.FAIL_MESSAGE,
      message: `${message.ERROR} :${err.message} `,
    });
  }
};
