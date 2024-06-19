const { protect } = require("../controller/authController");
const {
  addCategory,
  getCategories,
  addAllCategories,
} = require("../controller/categoryController");

const router = require("express").Router();

router.post("/addCategory/:categoryLevel", protect, addCategory);
router.get("/getCategory", protect, getCategories);
router.post("/addAllCategories", addAllCategories);

module.exports = router;
