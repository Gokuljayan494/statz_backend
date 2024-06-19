const express = require("express");
const {
  addBusiness,
  getCatagories,
  getBusiness,
  getShops,
  getShop,
} = require("../controller/businessController");
const { protect } = require("../controller/authController");

const router = express.Router();

router.post("/addBusiness", protect, addBusiness);
router.get("/getCatagories", protect, getCatagories);
router.get("/getSubCatagories", protect, getBusiness);
router.get("/getShops", protect, getShops);
router.get("/getShop", protect, getShop);

module.exports = router;
