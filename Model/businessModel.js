const mongoose = require("mongoose");

const businessSchema = mongoose.Schema(
  {
    name: {
      type: String,
      index: true,
    },
    image: [{ type: String }],
    description: String,
    long_description: String,
    place: {
      type: String,
      index: true,
    },
    address: String,
    phone_number: String,
    email: {
      type: String,
      unique: true,
    },
    registerNumber: String,
    gst_number: String,
    licence: String,
    location: {
      type: {
        type: String,
        enum: ["Point"],
        // required: true,
      },
      coordinates: {
        type: [Number],
        // required: true,
      },
    },
    website_url: String,
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      index: true,
    },
    parent_Catagories: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      index: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

businessSchema.index({ location: "2dsphere" });

const businessModel = mongoose.model("business", businessSchema);

module.exports = businessModel;
