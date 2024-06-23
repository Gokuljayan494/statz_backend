const express = require("express");
const {
  addBusiness,
  getCatagories,
  getBusiness,
  getShops,
  getShop,
  getSubCategories,
  getCategoriesList,
} = require("../controller/businessController");
const { protect } = require("../controller/authController");

const router = express.Router();

router.post("/addBusiness", protect, addBusiness);
router.get("/getCatagories", protect, getCatagories);
router.get("/getSubCatagories", protect, getBusiness);
router.get("/getShops", protect, getShops);
router.get("/getShop", protect, getShop);
router.get("/getCategoriesList", getCategoriesList);
router.get("/getSubCategoriesList", getSubCategories);

module.exports = router;
