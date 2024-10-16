import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const renderStars = () => {
    const totalStars = 5;
    const fullStars = Math.floor(product.ratings);
    const halfStar = product.ratings % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fa fa-star text-warning"></i>);
    }
    if (halfStar) {
      stars.push(
        <i key="half" className="fa fa-star-half-alt text-warning"></i>
      );
    }
    while (stars.length < totalStars) {
      stars.push(
        <i key={stars.length} className="fa fa-star-o text-warning"></i>
      );
    }
    return stars;
  };

  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
      <div className="card rounded">
        <img
          className="card-img-top"
          src={product.images[0].url}
          alt="Product"
          style={{
            width: "100%",
            height: "auto",
            padding: "7px",
            borderRadius: "10px",
          }}
        />

        <div className="d-flex justify-content-between align-items-center mt-2 px-3">
          <p
            className="card-text font-weight-bold mb-0"
            style={{ fontSize: "1.5rem" }}
          >
            ₱{product.price.toFixed(2)}
          </p>

          <div className="d-flex flex-column align-items-end">
            <div className="d-flex">{renderStars()}</div>
            <p className="mb-0 text-muted" style={{ fontSize: "0.9rem" }}>
              {product.numOfReviews === 0
                ? "No Reviews"
                : product.numOfReviews === 1
                ? "1 Review"
                : `${product.numOfReviews} Reviews`}
            </p>
          </div>
        </div>

        <div className="card-body d-flex flex-column align-items-start">
          <h5 className="card-title mb-0">{product.name}</h5>
          <h6 className="card-title text-muted mb-0">{product.author}</h6>

          <div
            className="w-100 d-flex justify-content-between"
            style={{ marginTop: "30px" }}
          >
            <button className="btn btn-primary w-75 mr-1">
              Add to Cart <i className="pi pi-shopping-cart"></i>
            </button>
            <Link
              to={`product/${product._id}`}
              id="view_btn"
              className="btn btn-secondary w-25 ml-1 d-flex justify-content-center align-items-center"
            >
              <i className="pi pi-info-circle"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
