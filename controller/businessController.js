// const { ObjectId } = mongoose;

const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;
const Category = require("../Model/CategoryModel");
const Business = require("../Model/businessModel");

exports.addBusiness = async (req, res) => {
  try {
    const {
      name,
      category,
      businessType,
      location,
      license,
      gst,
      email,
      phone,
      image,
    } = req.body;
    const id = req.user;

    console.log(req.body);
    const business = await Business.create({
      parent_Catagories: category,
      category: businessType,
      place: location,
      license,
      gst_number: gst,
      phone,
      email,
      name,
      image,
      userId: id,
    });
    if (!business) {
      throw new Error("Something went Wrong");
    }

    res
      .status(200)
      .json({ status: "Success", message: "Business Created Successfully" });
  } catch (err) {
    res.status(400).json({ status: "Fail", message: `Error:${err.message}` });
  }
};

exports.getCatagories = async (req, res) => {
  try {
    const businessCatagories = await Category.aggregate([
      {
        // $match: {
        //   _id: "$parent_Catagories",
        // },
        $match: {
          parentId: null,
        },
      },
    ]);

    if (!businessCatagories) throw new Error("Something went wrong");

    res.status(200).json({ status: "Success", data: businessCatagories });
  } catch (err) {
    res.status(400).json({ status: "Fail", message: `Error:${err.message}` });
  }
};

exports.getBusiness = async (req, res) => {
  try {
    const { catagoriesId } = req.query;

    const category = await Category.aggregate([
      {
        // $group: {
        //   _id: "$parentId",
        // },
        $match: {
          parentId: new ObjectId(catagoriesId),
        },
      },
    ]);

    if (!category) {
      throw new Error("Something Went Wrong");
    }
    res.status(200).json({ status: "Success", data: category });
  } catch (err) {
    res.status(400).json({ status: "Fail", message: `Error:${err.message}` });
  }
};

exports.getShops = async (req, res) => {
  try {
    const { catagoriesId, subCategory } = req.query;

    const shops = await Business.aggregate([
      {
        $match: {
          parent_Catagories: new ObjectId(catagoriesId),
          category: new ObjectId(subCategory),
        },
      },
    ]);
    if (!shops) {
      throw new Error("Something Went Wrong");
    }
    res.status(200).json({ status: "Success", data: shops });
  } catch (err) {
    res.status(400).json({ status: "Fail", message: `Error:${err.message}` });
  }
};

exports.getShop = async (req, res) => {
  try {
    const { shopId } = req.query;
    const shop = await Business.aggregate([
      {
        $match: {
          _id: new ObjectId(shopId),
        },
      },
    ]);

    if (!shop) {
      throw new Error("Something Went Wrong");
    }
    res.status(200).json({ status: "Success", data: shop });
  } catch (err) {
    res.status(400).json({ status: "Fail", message: `Error:${err.message}` });
  }
};

exports.getCategoriesList = async (req, res) => {
  try {
    const categories = await Category.aggregate([
      { $match: { parentId: null } },
      { $project: { _id: 1, name: 1 } },
    ]);
    res.status(200).json({ status: "Success", data: categories });
  } catch (err) {
    res.status(400).json({ status: "Fail", message: `Error:${err.message}` });
  }
};

exports.getSubCategories = async (req, res) => {
  try {
    const id = req.query.id;

    const subCategory = await Category.aggregate([
      { $match: { parentId: new ObjectId(id) } },
      { $project: { _id: 1, name: 1 } },
    ]);

    res.status(200).json({ status: "Success", data: subCategory });
  } catch (err) {
    res.status(400).json({ status: "Fail", message: `Error:${err.message}` });
  }
};
