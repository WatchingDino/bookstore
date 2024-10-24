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
import ListReviews from "../review/ListReviews";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

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

  // ================ IMAGES | THUMBNAIL MODAL ================

  const carouselRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef(null);

  const { isOpen: isModalOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setSelectedImage((prevIndex) =>
        prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [product.images, isPaused]);

  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
    setIsPaused(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 4000);
  };

  // ================ AUTHOR | PUBLISHER ================

  let displayOwner = "";

  if (product.author) {
    displayOwner = product.author;
  } else if (product.publisher) {
    displayOwner = product.publisher;
  } else {
    displayOwner = "";
  }

  // ================ DESCRIPTION | READ MORE/LESS | NEW LINE ================

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

  const highlightDescription = (description) => {
    return description.split(/~~(.*?)~~/g).map((part, index) => {
      if (index % 2 !== 0) {
        return (
          <strong key={index} className="font-bold">
            {part}
          </strong>
        );
      }
      return part;
    });
  };

  const descriptionLines = product.description
    ? product.description.split("//n")
    : [];

  // ================ GENRE ================

  const formatGenres = (genres) => {
    if (!genres || genres.length === 0) return "";
    if (genres.length === 1) return genres[0];

    const lastGenre = genres[genres.length - 1];
    const otherGenres = genres.slice(0, -1);
    return `${otherGenres.join(", ")} & ${lastGenre}`;
  };

  // =============================================

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="bg-[rgba(81,67,139,0.5)] font-roboto">
            <div className="flex justify-around items-start">
              {/* LEFT SIDE | PRODUCT IMAGE */}
              <div className="mt-4 w-[45%]">
                {product && product.images && product.images.length > 0 ? (
                  <div>
                    {/* Main Carousel */}
                    <div
                      className="carousel slide"
                      data-bs-ride="carousel"
                      data-bs-interval="4000"
                      id="imageIndex"
                      ref={carouselRef}
                    >
                      <div className="carousel-indicators">
                        {product.images.map((image, index) => (
                          <button
                            key={index}
                            type="button"
                            data-bs-target="#imageIndex"
                            data-bs-slide-to={index}
                            className={`${
                              index === selectedImage ? "active" : ""
                            } invert-[80%] opacity-90`}
                            aria-current={
                              index === selectedImage ? "true" : "false"
                            }
                            aria-label={`Slide ${index + 1}`}
                            onClick={() => handleThumbnailClick(index)}
                          ></button>
                        ))}
                      </div>

                      {/* Carousel Images */}
                      <div className="carousel-inner">
                        {product.images.map((image, index) => (
                          <div
                            key={index}
                            className={`carousel-item  ${
                              index === selectedImage ? "active" : ""
                            }`}
                          >
                            <img
                              src={image.url}
                              className="w-full h-[500px] object-contain rounded"
                              alt={`Slide ${index + 1}`}
                            />
                          </div>
                        ))}
                      </div>

                      {/* Previous and Next Buttons */}
                      <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#imageIndex"
                        data-bs-slide="prev"
                        onClick={() =>
                          setSelectedImage((prev) =>
                            prev === 0 ? product.images.length - 1 : prev - 1
                          )
                        }
                      >
                        <span
                          className="carousel-control-prev-icon invert-[80%] opacity-90"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Previous</span>
                      </button>

                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#imageIndex"
                        data-bs-slide="next"
                        onClick={() =>
                          setSelectedImage((prev) =>
                            prev === product.images.length - 1 ? 0 : prev + 1
                          )
                        }
                      >
                        <span
                          className="carousel-control-next-icon invert-[80%] opacity-90"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </div>

                    {/* Thumbnail Section */}
                    <div className="mt-3 flex justify-center">
                      <div className="flex flex-wrap w-3/4 justify-center">
                        {product.images.slice(0, 3).map((image, index) => (
                          <div key={index} className="w-1/4 p-1 cursor-pointer">
                            <img
                              src={image.url}
                              className={`rounded-lg p-0 object-cover h-[100px] w-[100px] ${
                                selectedImage === index
                                  ? "border-2 border-[#51438b]"
                                  : "border-none"
                              }`}
                              alt={`Thumbnail ${index + 1}`}
                              onClick={() => handleThumbnailClick(index)}
                            />
                          </div>
                        ))}

                        {product.images.length > 3 && (
                          <div
                            className="w-1/4 p-1 relative cursor-pointer"
                            onClick={onOpen}
                          >
                            <div
                              className="relative border-0 h-[100px] w-[100px] bg-cover bg-center rounded"
                              style={{
                                backgroundImage: `url(${product.images[3].url})`,
                              }}
                            >
                              <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center text-white bg-black bg-opacity-50 rounded text-2xl">
                                +{product.images.length - 3}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Show All Images */}
                    <>
                      <Modal
                        backdrop="blur"
                        isOpen={isModalOpen}
                        onOpenChange={onOpenChange}
                        size="xl"
                        classNames={{
                          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                          base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
                          closeButton: "hover:bg-white/5 active:bg-white/10",
                        }}
                      >
                        <ModalContent>
                          {(onClose) => (
                            <>
                              <ModalHeader className="flex justify-center items-center text-xl">
                                {product.name}
                              </ModalHeader>
                              <ModalBody>
                                <div className="flex flex-wrap justify-center">
                                  {product.images.map((image, index) => (
                                    <div
                                      key={index}
                                      className="w-1/4 p-2 cursor-pointer flex justify-center"
                                      onClick={() => {
                                        setSelectedImage(index);
                                        onClose();
                                        if (timeoutRef.current)
                                          clearTimeout(timeoutRef.current);
                                        setTimeout(
                                          () => setIsPaused(false),
                                          4000
                                        );
                                      }}
                                    >
                                      <img
                                        src={image.url}
                                        className="rounded w-full h-auto w-max-3/5"
                                        alt={`Image ${index + 1}`}
                                      />
                                    </div>
                                  ))}
                                </div>
                              </ModalBody>
                              <ModalFooter>
                                <Button
                                  className="bg-[#51438b] text-md font-roboto shadow-lg shadow-indigo-500/20 text-white"
                                  onPress={onClose}
                                >
                                  Close
                                </Button>
                              </ModalFooter>
                            </>
                          )}
                        </ModalContent>
                      </Modal>
                    </>
                  </div>
                ) : (
                  /* Display no Image */
                  <div className="flex justify-center items-center rounded h-[500px] bg-lightgray">
                    <i
                      className="pi pi-image text-5xl text-darkgray"
                      aria-label="Image Unavailable."
                    ></i>
                  </div>
                )}
              </div>

              {/* RIGHT SIDE | PRODUCT INFORMATION */}
              <div className="mt-4 shadow rounded p-4 w-[45%] bg-white">
                <p className="text-xl font-bold">
                  {product.name}
                  {product.series &&
                    product.series.trim() &&
                    ` (${product.series})`}
                </p>

                <p className="text-gray-500 font-semibold text-lg">
                  {displayOwner}
                </p>

                <div className="flex items-center">
                  <Rating
                    name="half-rating"
                    value={product.ratings}
                    precision={0.5}
                    sx={{
                      fontSize: "20px",
                      lineHeight: "0.8",
                    }}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.65 }} fontSize="inherit" />
                    }
                  />
                  <span className="ms-1 lh-1">
                    {product?.ratings !== undefined
                      ? product.ratings % 1 === 0
                        ? product.ratings.toFixed(0)
                        : product.ratings.toFixed(1)
                      : ""}
                  </span>

                  <span className="ms-1 lh-1">
                    {product.numOfReviews === 0
                      ? "(No Reviews)"
                      : product.numOfReviews === 1
                      ? "(1 Review)"
                      : `(${product.numOfReviews} Reviews)`}
                  </span>
                </div>

                <p className="mt-2 font-semibold pt-2">Description:</p>

                <p
                  className="mb-0 text-justify pt-1"
                  style={{
                    ...(isOpen ? null : paragraphStyles),
                  }}
                  ref={ref}
                >
                  {descriptionLines.map((line, index) => (
                    <span key={index}>
                      {highlightDescription(line)}
                      {index < descriptionLines.length - 1 && (
                        <span className="pt-1 block" />
                      )}
                    </span>
                  ))}
                </p>
                {showReadMoreButton && (
                  <div className="flex justify-end">
                    <span
                      onClick={() => setIsOpen(!isOpen)}
                      className="text-[#51438b] cursor-pointer"
                    >
                      {isOpen ? "Read Less" : "Read More"}
                    </span>
                  </div>
                )}

                {product.publisher && (
                  <p className="pt-1">
                    <span className="font-bold">Publisher:</span>{" "}
                    {product.publisher}
                  </p>
                )}

                {product.category && (
                  <p className="pt-1">
                    <span className="font-bold">Category:</span>{" "}
                    {product.category}
                  </p>
                )}

                {product && product.genre && product.genre.length > 0 && (
                  <p className="pt-1">
                    <span className="font-bold">Genre:</span>{" "}
                    {formatGenres(product.genre)}
                  </p>
                )}

                <div className="flex justify-between items-center">
                  <p className="m-0">
                    <span className="font-bold">Status:</span>
                    <span
                      className={`font-bold ${
                        product.stock > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {product.stock > 0 ? " In Stock" : " Out of Stock"}
                    </span>
                  </p>
                  <div className="flex items-center">
                    <span
                      className="bg-red-500 text-white rounded px-4 py-2 mr-2 cursor-pointer text-lg hover:bg-red-800 transition-all duration-300"
                      onClick={decreaseQty}
                      disabled={product.stock === 0}
                    >
                      -
                    </span>
                    <input
                      type="number"
                      className="form-control count text-center mr-2 w-1/2"
                      value={quantity}
                      disabled
                    />
                    <span
                      className="bg-blue-500 text-white rounded px-4 py-2 cursor-pointer text-lg hover:bg-blue-800 transition-all duration-300"
                      onClick={increaseQty}
                      disabled={product.stock === 0}
                    >
                      +
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-around mt-3">
                  <button
                    className={`text-white text-center font-bold rounded py-2 pointer w-[55%] hover:bg-[#3e326e] transition-all duration-300 ${
                      product.stock === 0 ? "bg-opacity-50" : "bg-[#51438b]"
                    }`}
                    onClick={addToCart}
                    disabled={product.stock === 0}
                  >
                    Add to Cart
                  </button>
                  <p className="m-0 font-bold text-red-600 text-2xl">
                    {product?.price !== undefined
                      ? product.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "PHP",
                        })
                      : "Price Unavailable"}
                  </p>
                </div>
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
              {product && product.reviews && product.reviews.length > 0 ? (
                <ListReviews reviews={product.reviews} />
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>
            <br />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
