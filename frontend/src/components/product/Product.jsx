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
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
      <div
        className="card rounded shadow cursor-pointer border-0"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link
          className="text-decoration-none text-reset"
          to={`product/${product._id}`}
        >
          <img
            className="card-img-top w-100 rounded-1"
            src={product.images[currentImageIndex].url}
            alt="Product"
            style={{
              height: "350px",
              objectFit: "cover",
            }}
          />
        </Link>

        <div className="d-flex justify-content-between align-items-center mt-2 px-3">
          <div className="d-flex flex-column align-items-start">
            {/* ================ FOR IMPROVEMENT NG SYSTEM IF MAG SALE ANG PRODUCT OR WHAT ================ */}
            {/* <div className="d-flex">
              <p className="card-text fw-bold text-muted mb-0 text-decoration-line-through fs-5">
                ₱{product.price.toFixed(2)}
              </p>
            </div> */}
            <p
              className="card-text fw-bold mb-0 fs-4"
              style={{ color: "rgba(212, 17, 17, 0.8)" }}
            >
              ₱{product.price.toFixed(2)}
            </p>
          </div>

          <div className="d-flex flex-column align-items-end">
            {/* MISSING ONCLICK */}
            <Rating
              name="half-rating"
              value={product.ratings}
              precision={0.5}
              sx={{
                fontSize: "20px",
                lineHeight: "0.9",
              }}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            <p className="mb-0 text-muted" style={{ fontSize: "0.9rem" }}>
              {product.numOfReviews === 0
                ? "No Reviews"
                : product.numOfReviews === 1
                ? "1 Review"
                : `${product.numOfReviews} Reviews`}
            </p>
          </div>
        </div>
        <div className="card-body d-flex flex-column align-items-start pt-1">
          <h5 className="card-title mb-0 ">{product.name}</h5>
          <h6 className="card-title text-muted mb-0">{product.author}</h6>

          <div className="w-100 d-flex gap-1 mt-2">
            <button
              className="btn w-75 text-white"
              style={{
                backgroundColor: "#51438b",
                fontSize: "14px",
              }}
            >
              Add to Cart
            </button>
            <Link
              to={`product/${product._id}`}
              className="text-white d-flex justify-content-center align-items-center w-25"
              style={{ backgroundColor: "#51438b", borderRadius: "5px" }}
            >
              <i className="pi pi-info-circle" style={{ fontSize: "16px" }}></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
