import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const Product = ({ product }) => {
  // ================ IMAGE TRANSITION ================

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let imageInterval;
    if (isHovered) {
      imageInterval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
        );
      }, 1500);
    } else {
      setCurrentImageIndex(0);
    }

    return () => {
      clearInterval(imageInterval);
    };
  }, [isHovered, product.images.length]);

  // =============================================

  return (
    <div className="my-2 w-full sm:w-1/2 lg:w-1/4 font-roboto">
      <div
        className="rounded-lg shadow-lg cursor-pointer border-0 bg-white pb-3"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link className="no-underline text-black" to={`product/${product._id}`}>
          <img
            className="rounded-t-lg w-full h-64 object-cover"
            src={product.images[currentImageIndex].url}
            alt="Product"
          />
        </Link>

        <div className="flex justify-between items-center mt-2 px-3">
          <div className="flex flex-col items-start">
            {/* FOR IMPROVEMENT OF SYSTEM IF PRICES HAD CHANGED */}
            {/* <div className="flex">
              <p className="text-gray-500 line-through mb-0 text-lg font-bold">
                {product.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "PHP",
                })}
              </p>
            </div> */}
            <p className="text-red-600 font-bold mb-0 text-xl">
              {product.price.toLocaleString("en-US", {
                style: "currency",
                currency: "PHP",
              })}
            </p>
          </div>

          <div className="flex flex-col items-end">
            <Rating
              name="half-rating"
              value={product.ratings}
              precision={0.1}
              sx={{
                fontSize: "20px",
                lineHeight: "0.8",
              }}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
              readOnly
            />
            <p className="mb-0 text-gray-500 text-sm">
              {product.numOfReviews === 0
                ? "No Reviews"
                : product.numOfReviews === 1
                ? "1 Review"
                : `${product.numOfReviews} Reviews`}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start px-3">
          <p className="mb-0 text-lg px-1 pt-1 font-bold truncate w-full">
            {product.name}
          </p>
          <p
            className={`text-sm px-1 pb-1 font-semibold mb-0 truncate w-full ${
              product.author || product.publisher
                ? "text-gray-600"
                : "text-red-400"
            }`}
          >
            {product.author || product.publisher || "`No Author or Publisher`"}
          </p>

          <div className="w-full flex gap-1 mt-2">
            <button className="bg-nbTheme text-white h-8 font-semibold w-full text-sm rounded-md hover:bg-[#3e326e] transition-all duration-300">
              Add to Cart
            </button>
            <Link
              to={`product/${product._id}`}
              className="bg-nbTheme text-white h-8 flex justify-center items-center w-14 rounded-md hover:bg-[#3e326e] transition-all duration-300"
            >
              <i className="pi pi-info-circle text-md"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
