import React, { Fragment, useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, clearErrors } from "../../actions/productActions";
import { addItemToCart } from "../../actions/cartActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import ListReviews from "../review/ListReviews";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const notify = (error = "") => toast.error(error);

  useEffect(() => {
    dispatch(getProductDetails(id));

    if (error) {
      notify(error);
      dispatch(clearErrors());
    }
  }, [dispatch, id, error]);

  const increaseQty = () => {
    if (quantity >= product.stock) return;
    setQuantity(quantity + 1);
  };

  const decreaseQty = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };

  const addToCart = () => {
    dispatch(addItemToCart(id, quantity));
  };

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

  const handleSlideChange = (index) => {
    if (index >= 0 && index < product.images.length) {
      setCurrentImageIndex(index);
    }
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={product.name} />

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <div style={{ width: "45%", padding: "20px" }}>
              <div
                className="carousel slide carousel-fade"
                data-mdb-carousel-init
                data-mdb-ride="carousel"
              >
                <ol className="carousel-indicators">
                  {product.images &&
                    product.images.map((_, index) => (
                      <li
                        key={index}
                        data-mdb-slide-to={index}
                        className={index === currentImageIndex ? "active" : ""}
                        onClick={() => handleSlideChange(index)}
                      ></li>
                    ))}
                </ol>

                <div className="carousel-inner">
                  {product.images &&
                    product.images.map((image, index) => (
                      <div
                        key={image.public_id}
                        className={`carousel-item ${
                          index === currentImageIndex ? "active" : ""
                        }`}
                      >
                        <img
                          src={image.url}
                          className="d-block w-100"
                          alt={product.name}
                          style={{
                            objectFit: "cover",
                            height: "400px",
                            borderRadius: "5px",
                          }}
                        />
                      </div>
                    ))}
                </div>

                <a
                  className="carousel-control-prev"
                  role="button"
                  onClick={() =>
                    handleSlideChange(
                      (currentImageIndex - 1 + product.images.length) %
                        product.images.length
                    )
                  }
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  role="button"
                  onClick={() =>
                    handleSlideChange(
                      (currentImageIndex + 1) % product.images.length
                    )
                  }
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </a>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                {product.images &&
                  product.images.map((image, index) => (
                    <img
                      key={image.public_id}
                      src={image.url}
                      alt={product.name}
                      style={{
                        width: "80px",
                        height: "80px",
                        margin: "5px",
                        cursor: "pointer",
                        borderRadius: "2px",
                        objectFit: "cover",
                        border:
                          index === currentImageIndex
                            ? "1px solid #808080"
                            : "none",
                      }}
                      onClick={() => handleThumbnailClick(index)}
                    />
                  ))}
              </div>
            </div>

            <div
              style={{
                width: "45%",
                padding: "20px",
                backgroundColor: "#fff",
              }}
            >
              <h2>
                {product.name} <i className="pi pi-clone"></i>
              </h2>
              <h4>{product.series}</h4>

              <div style={{ display: "flex", alignItems: "center" }}>
                {renderStars()}
                <span style={{ marginLeft: "10px" }}>
                  {/* {product.ratings.toFixed(1)} */}
                </span>{" "}
                <span style={{ marginLeft: "10px" }}>
                  {product.numOfReviews === 0
                    ? "(No Reviews)"
                    : product.numOfReviews === 1
                    ? "(1 Review)"
                    : `(${product.numOfReviews} Reviews)`}
                </span>
              </div>

              <h4 style={{ marginTop: "20px" }}>Description:</h4>
              <p>{product.description}</p>

              <div style={{ display: "flex", alignItems: "center" }}>
                <button
                  onClick={decreaseQty}
                  style={{
                    padding: "5px 10px",
                    border: "1px solid #ddd",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  readOnly
                  style={{
                    width: "40px",
                    textAlign: "center",
                    margin: "0 10px",
                    border: "1px solid #ddd",
                  }}
                />
                <button
                  onClick={increaseQty}
                  style={{
                    padding: "5px 10px",
                    border: "1px solid #ddd",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  +
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around", //evenly, between              
                  marginTop: "20px",
                }}
              >
                <button
                  onClick={addToCart}
                  style={{
                    width: "55%", 
                    padding: "10px 20px",
                    backgroundColor: "#28a745",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  Add to Cart
                </button>
                <p style={{ color: "#ff0000", fontSize: "24px", margin: 0 }}>
                  ₱{product.price}
                </p>
              </div>

              <p style={{ marginTop: "10px" }}>
                Status:{" "}
                <span style={{ color: product.stock > 0 ? "green" : "red" }}>
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </p>
            </div>
          </div>

          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              width: "80%",
              marginLeft: "auto",
              marginRight: "auto",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
            }}
          >
            {product.reviews && product.reviews.length > 0 ? (
              <ListReviews reviews={product.reviews} />
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
