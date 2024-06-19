const express = require("express");
const {
  login,
  sendLoginOtp,
  register,
} = require("../controller/userController");

const router = express.Router();

//routes

router.post("/register", register);
router.post("/login", login);

// router.post("/otpLogin", sendLoginOtp);

module.exports = router;
