const express = require("express");
const {
  login,
  sendLoginOtp,
  register,
  userDetails,
} = require("../controller/userController");
const { protect } = require("../controller/authController");

const router = express.Router();

//routes

router.post("/register", register);
router.post("/login", login);
router.get("/userDetails", protect, userDetails);

module.exports = router;
