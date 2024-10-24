const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter the Product Name"],
  },
  category: { 
    type: String,
    default: "",
    // required: [true, "Please Select Category for this Product"],
  },
  genre: {
    type: [String],
    // required: [true, "Please Select Genre for this Product"],
  },
  series: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    required: [true, "Please Enter the Description"],
  },
  author: {
    type: String,
    default: "",
    // required: [true, "Please Enter the Author"],
  },
  publisher: {
    type: String,
    default: "",
    // required: [true, "Please Enter the Publisher"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter the Price"],
    default: 0.0,
  },
  stock: {
    type: Number,
    required: [true, "Please Enter the Stock"],
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  ratings: {
    type: Number,
    default: 0.0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      comment: {
        type: String,
        required: true,
      },
      dateReviewed: {
        type: Date,
        required: true,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
