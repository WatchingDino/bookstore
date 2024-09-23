const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter the Product Name"],
    // trim: true,
    // maxLength: [100, "Product name cannot exceed 100 characters"],
  },
  // category: {
  //   type: String,
  //   required: [true, "Please Select Category for this Product"],
  // },
  genre: 
  // [
    {
      // type: String,
      type: [String], // Changed to an array of strings to allow multiple genres
      required: [true, "Please Select Genre for this Product"],
    },
  // ],
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
    required: [true, "Please Enter the Author"],
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
    default: 0,
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
        // default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
