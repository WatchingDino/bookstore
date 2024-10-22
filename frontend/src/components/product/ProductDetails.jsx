import React, { Fragment, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, clearErrors } from "../../actions/productActions";
import { addItemToCart } from "../../actions/cartActions";
import Loader from "../layout/Loader";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import MetaData from "../layout/MetaData";
// import ListReviews from "../review/ListReviews";

const ProductDetails = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

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

  // ================ QUANTITY CONTROL ================

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

  // ================ IMAGES ================

  const [selectedImage, setSelectedImage] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
  };

  const handleMoreImagesClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  // ================ DESCRIPTION ================

  const [isOpen, setIsOpen] = useState(false);
  const [showReadMoreButton, setShowReadMoreButton] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      setShowReadMoreButton(
        ref.current.scrollHeight !== ref.current.clientHeight
      );
    }
  }, [product?.description]);

  const paragraphStyles = {
    WebkitLineClamp: 5,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    display: "-webkit-box",
  };

  // =============================================

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div
            style={{
              backgroundColor: "rgba(81, 67, 139, 0.5)",
            }}
          >
            <div className="d-flex justify-content-around align-items-start">
              <div className="mt-4" style={{ width: "45%" }}>
                {product && product.images && product.images.length > 0 ? (
                  <div>
                    {/* Main Carousel */}
                    <div
                      className="carousel slide"
                      data-bs-ride="carousel"
                      id="CurrentlyImage"
                    >
                      <div className="carousel-indicators">
                        {product.images.map((image, index) => (
                          <button
                            key={index}
                            type="button"
                            data-bs-target="#CurrentlyImage"
                            data-bs-slide-to={index}
                            className={index === selectedImage ? "active" : ""}
                            aria-current={
                              index === selectedImage ? "true" : "false"
                            }
                            aria-label={`Slide ${index + 1}`}
                            style={{
                              filter: "invert(80%)",
                              opacity: "0.9",
                            }}
                          ></button>
                        ))}
                      </div>

                      {/* Carousel Images */}
                      <div className="carousel-inner rounded">
                        {product.images.map((image, index) => (
                          <div
                            key={index}
                            className={`carousel-item ${
                              index === selectedImage ? "active" : ""
                            }`}
                          >
                            <img
                              src={image.url}
                              className="d-block w-100"
                              style={{
                                height: "500px",
                                objectFit: "contain",
                              }}
                              alt={`Slide ${index + 1}`}
                            />
                          </div>
                        ))}
                      </div>

                      {/* Previous and Next Buttons */}
                      <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#CurrentlyImage"
                        data-bs-slide="prev"
                        onClick={() =>
                          setSelectedImage((prev) =>
                            prev === 0 ? product.images.length - 1 : prev - 1
                          )
                        }
                      >
                        <span
                          className="carousel-control-prev-icon"
                          aria-hidden="true"
                          style={{
                            filter: "invert(80%)",
                            opacity: "0.9",
                          }}
                        ></span>
                        <span className="visually-hidden">Previous</span>
                      </button>

                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#CurrentlyImage"
                        data-bs-slide="next"
                        onClick={() =>
                          setSelectedImage((prev) =>
                            prev === product.images.length - 1 ? 0 : prev + 1
                          )
                        }
                      >
                        <span
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                          style={{
                            filter: "invert(80%)",
                            opacity: "0.9",
                          }}
                        ></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </div>

                    {/* Thumbnail Section */}
                    <div className="mt-3 d-flex justify-content-center">
                      <div className="row w-75 justify-content-center">
                        {product.images.slice(0, 3).map((image, index) => (
                          <div
                            key={index}
                            className="col-3 p-1"
                            style={{ cursor: "pointer" }}
                          >
                            <img
                              src={image.url}
                              className="img-thumbnail rounded object-fit-cover p-0"
                              alt={`Thumbnail ${index + 1}`}
                              onClick={() => handleThumbnailClick(index)}
                              style={{
                                height: "100px",
                                width: "100px",
                                border:
                                  selectedImage === index
                                    ? "2px solid #51438b"
                                    : "none",
                              }}
                            />
                          </div>
                        ))}

                        {product.images.length > 3 && (
                          <div
                            className="col-3 p-1 position-relative"
                            style={{ cursor: "pointer" }}
                            onClick={handleMoreImagesClick}
                          >
                            <div
                              className="img-thumbnail position-relative border-0"
                              style={{
                                height: "100px",
                                width: "100px",
                                backgroundImage: `url(${product.images[3].url})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }}
                            >
                              <div
                                className="position-absolute top-0 start-0 h-100 w-100 d-flex justify-content-center align-items-center text-white rounded"
                                style={{
                                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                                  fontSize: "1.5rem",
                                }}
                              >
                                +{product.images.length - 3}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* All Images */}
                    <div
                      className={`modal fade ${showModal ? "show" : ""}`}
                      tabIndex="-1"
                      style={{ display: showModal ? "block" : "none" }}
                      aria-hidden={!showModal}
                    >
                      <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                          <div className="modal-header d-flex justify-content-center">                        
                            <h5 className="modal-title text-center flex-grow-1">
                              {/* {product.name} */}
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              onClick={handleModalClose}
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <div className="row">
                              {product.images.map((image, index) => (
                                <div
                                  key={index}
                                  className="col-3 p-2"
                                  style={{ cursor: "pointer" }}
                                >
                                  <img
                                    src={image.url}
                                    className="img-fluid rounded w-100 h-auto"
                                    alt={`Image ${index + 1}`}
                                    onClick={() => {
                                      setSelectedImage(index);
                                      handleModalClose();
                                    }}
                                    style={{ maxWidth: '80%' }}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* DISPLAY NO IMAGE */
                  <div
                    className="d-flex justify-content-center align-items-center rounded"
                    style={{
                      height: "500px",
                      backgroundColor: "lightgray",
                    }}
                  >
                    <i
                      className="fas fa-image"
                      style={{ fontSize: "48px" }}
                      aria-label="Image Unavailable."
                    ></i>
                  </div>
                )}
              </div>

              <div
                className="mt-4 shadow rounded p-4"
                style={{
                  width: "45%",
                  backgroundColor: "#fff",
                }}
              >
                <h2>{product.name}</h2>
                {/* <h4>{product.author}</h4>
                <h4>{product.series}</h4> */}
                <div className="d-flex align-items-center">
                  <Rating
                    name="half-rating"
                    value={product.ratings}
                    precision={0.5}
                    sx={{
                      fontSize: "20px",
                      lineHeight: "0.9",
                    }}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.65 }} fontSize="inherit" />
                    }
                  />
                  {/* <span className="ms-1 lh-1">{product.ratings.toFixed(1)}</span> */}
                  <span className="ms-1 lh-1">
                    {product.numOfReviews === 0
                      ? "(No Reviews)"
                      : product.numOfReviews === 1
                      ? "(1 Review)"
                      : `(${product.numOfReviews} Reviews)`}
                  </span>
                </div>

                <h4 className="mt-3">Description:</h4>

                <p
                  className="fw-bold"
                  style={{
                    textAlign: "justify",
                  }}
                >
                  {product.highlight}
                </p>

                <p
                  className="mb-0"
                  style={{
                    textAlign: "justify",
                    ...(isOpen ? null : paragraphStyles),
                  }}
                  ref={ref}
                >
                  {product.description}
                </p>
                {showReadMoreButton && (
                  <div className="d-flex justify-content-end">
                    <span
                      onClick={() => setIsOpen(!isOpen)}
                      style={{
                        color: "#51438b",
                        cursor: "pointer",
                      }}
                    >
                      {isOpen ? "Read Less" : "Read More"}
                    </span>
                  </div>
                )}

                <div className="d-flex justify-content-between align-items-center mt-3">
                  <p style={{ margin: 0 }}>
                    Status:
                    <span
                      style={{ color: product.stock > 0 ? "green" : "red" }}
                    >
                      {product.stock > 0 ? " In Stock" : " Out of Stock"}
                    </span>
                  </p>
                  <div className="d-flex align-items-center">
                    <span
                      className="btn btn-danger minus me-2"
                      onClick={decreaseQty}
                      disabled={product.stock === 0}
                    >
                      -
                    </span>
                    <input
                      type="number"
                      className="form-control count text-center me-2"
                      value={quantity}
                      readOnly
                      style={{ width: "50%" }}
                    />
                    <span
                      className="btn btn-primary plus"
                      onClick={increaseQty}
                      disabled={product.stock === 0}
                    >
                      +
                    </span>
                  </div>
                </div>

                <div className="d-flex justify-content-around mt-4">
                  <button
                    className="text-white border-0 text-center rounded pointer"
                    onClick={addToCart}
                    style={{
                      width: "55%",
                      backgroundColor: "#51438b",
                      opacity: product.stock === 0 ? 0.5 : 1,
                    }}
                    disabled={product.stock === 0}
                  >
                    Add to Cart
                  </button>
                  <p
                    className="m-0 fw-bold"
                    style={{
                      color: "rgba(212, 17, 17, 0.8)",
                      fontSize: "26px",
                    }}
                  >
                    ₱
                    {product?.price !== undefined
                      ? product.price.toFixed(2)
                      : "Price Unavailable"}
                  </p>
                </div>
              </div>
            </div>
            {/* <div
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
          </div> */}
            <br />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
