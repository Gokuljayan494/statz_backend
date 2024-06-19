const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: [
      {
        type: String,
      },
    ],
    description: {
      type: "String",
    },
    parentId: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      default: null,
      index: true,
    },
    categoryLevel: {
      type: Number,
      required: true,
      default: 1,
      index: true,
    },
  },
  { timeStamps: true }
);

const categoryModel = mongoose.model("category", categorySchema);

module.exports = categoryModel;
