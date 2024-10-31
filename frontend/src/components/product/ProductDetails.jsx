import React, { Fragment, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../actions/cartActions";
import Loader from "../layout/Loader";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import MetaData from "../layout/MetaData";
import ListReviews from "../review/ListReviews";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

import {
  getProductDetails,
  newReview,
  clearErrors,
} from "../../actions/productActions";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";

const ProductDetails = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const successMsg = (message = "") => toast.success(message);

  const notify = (error = "") => toast.error(error);

  const { error: reviewError, success } = useSelector(
    (state) => state.newReview
  );

  useEffect(() => {
    dispatch(getProductDetails(id));
    if (error) {
      notify(error);
      dispatch(success());
    }
    if (reviewError) {
      notify(reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      successMsg("Review Posted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, alert, error, reviewError, success, id]);

  // ================ REVIEWS | MODAL ================

  const { user } = useSelector((state) => state.auth);
  const {
    isOpen: isReviewOpen,
    onOpen: onReviewOpen,
    onClose: onReviewClose,
  } = useDisclosure();

  const onReviewAlwaysClose = () => {
    setRatingValue(0);
    setComment("");
    onReviewClose();
  };

  const labels = {
    0.1: "Extremely disappointing.",
    0.2: "Not worth it.",
    0.3: "Fell far below expectations.",
    0.4: "Would not recommend.",
    0.5: "Very dissatisfied.",
    0.6: "Nearly unusable.",
    0.7: "A letdown overall.",
    0.8: "Serious issues encountered.",
    0.9: "Quality is very low.",
    1.0: "Poor experience.",
    1.1: "Would not buy again.",
    1.2: "Useless.",
    1.3: "Almost unusable.",
    1.4: "Not up to standard.",
    1.5: "Below expectations.",
    1.6: "Poor quality.",
    1.7: "Could be improved.",
    1.8: "Okay, but not great.",
    1.9: "Average at best.",
    2.0: "Just okay.",
    2.1: "Could be better.",
    2.2: "Fair product.",
    2.3: "Not bad, not great.",
    2.4: "Good in some aspects.",
    2.5: "Meets basic expectations.",
    2.6: "Acceptable quality.",
    2.7: "Decent, but room for improvement.",
    2.8: "Satisfied overall.",
    2.9: "Does the job.",
    3.0: "Pretty good.",
    3.1: "Above average.",
    3.2: "Solid quality.",
    3.3: "Reliable and satisfactory.",
    3.4: "Pleasantly surprised.",
    3.5: "Better than expected.",
    3.6: "Good value.",
    3.7: "Would recommend.",
    3.8: "Very happy with it.",
    3.9: "Quality exceeded expectations.",
    4.0: "Great product.",
    4.1: "High quality.",
    4.2: "Very impressed.",
    4.3: "Highly recommend.",
    4.4: "Stands out among similar products.",
    4.5: "Exceptional quality.",
    4.6: "Delighted with the purchase.",
    4.7: "Fantastic experience.",
    4.8: "Exactly what I needed.",
    4.9: "Nearly perfect.",
    5.0: "Outstanding, would buy again!",
  };

  const handleRatingChange = (event, newValue) => {
    setRatingValue(newValue);
    setComment(labels[newValue] || "");
    setHover(-1);
  };

  const handleHoverChange = (event, newHover) => {
    setHover(newHover);
    if (newHover !== -1) {
      setComment(labels[newHover] || "");
    }
  };

  const handleInputChange = (event) => {
    const input = parseFloat(event.target.value);
    if (!isNaN(input) && input >= 0 && input <= 5) {
      setRatingValue(input);
      setComment(labels[input] || "");
      setHover(-1);
    }
  };

  const [ratingValue, setRatingValue] = useState();
  const [hover, setHover] = useState(-1);
  const [comment, setComment] = useState("");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const reviewHandler = () => {
    const formData = new FormData();
    formData.set("rating", ratingValue);
    formData.set("comment", comment);
    formData.set("productId", id);
    dispatch(newReview(formData));
  };

  // ================ REVIEWS | SEE MORE/LESS ================

  const [visibleReviewCount, setVisibleReviewCount] = useState(4);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReviewMoreButton, setShowReviewMoreButton] = useState(false);
  const reviewRef = useRef(null);

  useEffect(() => {
    if (product?.reviews?.length > 4) {
      setShowReviewMoreButton(true);
    }
  }, [product?.reviews]);

  const handleToggleSeeMore = () => {
    if (isExpanded) {
      setVisibleReviewCount(4);
    } else {
      setVisibleReviewCount(product.reviews.length);
    }
    setIsExpanded(!isExpanded);
  };

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

  const {
    isOpen: isImageOpen,
    onOpen: onImageOpen,
    onOpenChange: onImageOpenChange,
  } = useDisclosure();

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setSelectedImage((prevIndex) =>
        prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

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
    }, 5000);
  };

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
          <div className="bg-nbLightTheme font-roboto py-4">
            <div className="rounded bg-white mx-5 shadow">
              <section id="productInformation" className="pb-5 pt-1">
                <div className="flex justify-around items-start">
                  {/* LEFT SIDE | PRODUCT IMAGES */}
                  <div className="mt-4 w-[45%]">
                    {product && product.images && product.images.length > 0 ? (
                      <div>
                        {/* Main Carousel */}
                        <div
                          className="carousel slide"
                          data-bs-ride="carousel"
                          data-bs-interval="5000"
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
                                  className="w-full h-[550px] object-scale-down rounded"
                                  alt={`${product.name} Image`}
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
                                prev === 0
                                  ? product.images.length - 1
                                  : prev - 1
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
                                prev === product.images.length - 1
                                  ? 0
                                  : prev + 1
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
                              <div
                                key={index}
                                className="w-1/4 p-1 cursor-pointer"
                              >
                                <img
                                  src={image.url}
                                  className={`rounded p-0 object-cover hover:object-scale-down h-[100px] w-[100px] ${
                                    selectedImage === index
                                      ? "border-2 border-nbTheme"
                                      : "border-1 border-gray-300"
                                  }`}
                                  alt={`${product.name} Thumbnail`}
                                  onClick={() => handleThumbnailClick(index)}
                                />
                              </div>
                            ))}

                            {product.images.length > 3 && (
                              <div
                                className="w-1/4 p-1 relative cursor-pointer"
                                onClick={onImageOpen}
                              >
                                <div
                                  className="relative border-0 h-[100px] w-[100px] bg-cover bg-center rounded transition-all duration-300 ease-in-out hover:bg-gray-100 hover:brightness-125"
                                  style={{
                                    backgroundImage: `url(${product.images[3].url})`,
                                  }}
                                >
                                  <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center text-white bg-black bg-opacity-50 rounded text-2xl transition-all duration-300 ease-in-out hover:bg-opacity-10">
                                    +{product.images.length - 3}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Show All Images */}

                        <Modal
                          backdrop="blur"
                          isOpen={isImageOpen}
                          onOpenChange={onImageOpenChange}
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
                                <ModalHeader className="flex justify-center text-white items-center text-xl">
                                  {/* {product.name} */}
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
                                            5000
                                          );
                                        }}
                                      >
                                        <img
                                          src={image.url}
                                          className="rounded w-full h-auto w-max-3/5"
                                          alt={`${product.name} Image`}
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </ModalBody>
                                <ModalFooter>
                                  <Button
                                    className="bg-nbTheme text-md font-roboto shadow-lg shadow-indigo-500/20 text-white"
                                    onPress={onClose}
                                  >
                                    Close
                                  </Button>
                                </ModalFooter>
                              </>
                            )}
                          </ModalContent>
                        </Modal>
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

                  {/* RIGHT SIDE | PRODUCT DETAILS */}
                  <div className="mt-4 rounded w-[45%]">
                    <div className="flex items-center justify-between">
                      <div className="w-[75%]">
                        <p className="text-2xl font-bold">{product.name}</p>
                        <p
                          className={`text-lg font-semibold inline-block ${
                            product.author || product.publisher
                              ? "text-gray-500"
                              : "text-red-400"
                          }`}
                        >
                          {product.author
                            ? `${product.author} (Author)`
                            : product.publisher
                            ? `${product.publisher} (Publisher)`
                            : "`No Author or Publisher`"}
                        </p>
                      </div>

                      <div className="w-[25%] text-center">
                        <p className="m-0 font-bold text-red-600 text-2xl">
                          {product?.price !== undefined
                            ? product.price.toLocaleString("en-US", {
                                style: "currency",
                                currency: "PHP",
                              })
                            : "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center text-md mt-1">
                      <span className="me-2 text-muted lh-1">
                        {product?.ratings !== undefined
                          ? product.ratings % 1 === 0
                            ? product.ratings.toFixed(0)
                            : product.ratings.toFixed(1)
                          : ""}
                      </span>
                      <div onClick={onReviewOpen}>
                        <Rating
                          name="half-rating"
                          value={product.ratings}
                          precision={0.1}
                          sx={{
                            fontSize: "25px",
                            lineHeight: "0.8",
                            marginTop: "4px",
                          }}
                          emptyIcon={
                            <StarIcon
                              style={{ opacity: 0.65 }}
                              fontSize="inherit"
                            />
                          }
                        />
                      </div>

                      <a
                        href="#reviews"
                        className="ms-3 lh-1 text-nbTheme text-md hover:underline"
                      >
                        <span>
                          {product.numOfReviews === 0
                            ? "No Reviews"
                            : product.numOfReviews === 1
                            ? "See 1 Review"
                            : `See All ${product.numOfReviews} Reviews`}
                        </span>
                      </a>
                    </div>

                    <p className="mt-2 font-semibold text-md pt-2">
                      Description:
                    </p>

                    <p
                      className="mb-0 text-justify text-md pt-1"
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
                          className="text-nbTheme text-md cursor-pointer hover:underline"
                        >
                          {isOpen ? "Read Less" : "Read More"}
                        </span>
                      </div>
                    )}

                    {product.series && (
                      <p className="pt-1 text-md">
                        <span className="font-bold">Series:</span>{" "}
                        {product.series}
                      </p>
                    )}

                    {product.author && product.publisher && (
                      <p className="pt-1 text-md">
                        <span className="font-bold">Publisher:</span>{" "}
                        {product.publisher}
                      </p>
                    )}

                    {product.category && (
                      <p className="pt-1 text-md">
                        <span className="font-bold">Category:</span>{" "}
                        {product.category}
                      </p>
                    )}

                    {product && product.genre && product.genre.length > 0 && (
                      <p className="pt-1 text-md">
                        <span className="font-bold">Genre:</span>{" "}
                        {formatGenres(product.genre)}
                      </p>
                    )}

                    <div className="flex justify-between items-center">
                      <p className="m-0 text-md">
                        <span className="font-bold">Status:</span>
                        <span
                          className={`font-bold ${
                            product.stock > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {product.stock > 0 ? " In Stock" : " Out of Stock"}
                        </span>
                      </p>
                      <div className="flex items-center">
                        <span
                          className="bg-red-500 text-white rounded px-4 py-2 mr-2 cursor-pointer text-md hover:bg-red-800 transition-all duration-300"
                          onClick={decreaseQty}
                          disabled={product.stock === 0}
                        >
                          -
                        </span>
                        <input
                          type="number"
                          className="form-control text-md count text-center mr-2 w-1/2"
                          value={quantity}
                          disabled
                        />
                        <span
                          className="bg-blue-500 text-white rounded px-4 py-2 cursor-pointer text-md hover:bg-blue-800 transition-all duration-300"
                          onClick={increaseQty}
                          disabled={product.stock === 0}
                        >
                          +
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-center mt-3">
                      <button
                        className={`text-white text-center text-md font-bold rounded py-2 pointer w-[70%] hover:bg-[#3e326e] transition-all duration-300 ${
                          product.stock === 0 ? "bg-opacity-50" : "bg-nbTheme"
                        }`}
                        onClick={addToCart}
                        disabled={product.stock === 0}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </section>
              <section id="reviews" className="mx-5 mt-5 pb-5">
                <div className="mb-2 flex justify-between items-center">
                  <p className="text-lg font-semibold">
                    {product && product.reviews && product.reviews.length > 0
                      ? "Recent Reviews"
                      : "Product Reviews"}
                  </p>

                  <Popover placement="top-end" offset={20}>
                    <PopoverTrigger>
                      <Button
                        onClick={user ? onReviewOpen : undefined}
                        className="text-md px-3 py-2 flex items-center cursor-pointer rounded bg-nbTheme text-white transition-all duration-300 relative hover:bg-[#3e326e]"
                      >
                        Review Product
                        <i className="pi pi-pen-to-square"></i>
                      </Button>
                    </PopoverTrigger>
                    {!user && (
                      <PopoverContent className="bg-nbTheme text-white">
                        <div className="px-2 py-2">
                          <div className="text-md font-roboto  font-bold">
                            Login Required!
                          </div>
                          <div className="text-sm">
                            Please login to leave a review.
                          </div>
                        </div>
                      </PopoverContent>
                    )}
                  </Popover>

                  <Modal
                    backdrop="blur"
                    isOpen={isReviewOpen}
                    onClose={onReviewAlwaysClose}
                    size="xl"
                    classNames={{
                      backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                      base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
                      closeButton: "hover:bg-white/5 active:bg-white/10",
                    }}
                  >
                    <ModalContent>
                      {(onReviewAlwaysClose) => (
                        <>
                          <ModalHeader className="flex flex-col gap-1 text-white">
                            Submit Your Review
                          </ModalHeader>
                          <ModalBody>
                            <p className="text-[#a8b0d3]">
                              We value your feedback on our products. Please
                              share your thoughts, as your insights help us
                              improve and better serve our community. Your
                              reviews are essential in ensuring a great
                              experience for everyone.
                            </p>

                            <div className="flex justify-center items-center space-x-2">
                              <input
                                type="number"
                                step="0.1"
                                min="0"
                                max="5"
                                value={hover !== -1 ? hover : ratingValue || ""}
                                onChange={handleInputChange}
                                className="text-2xl text-[#a8b0d3] w-[15%] rounded bg-[#19172c] p-1 text-center"
                              />

                              <Rating
                                name="hover-feedback"
                                value={ratingValue}
                                defaultValue={0}
                                precision={0.1}
                                onChange={handleRatingChange}
                                onChangeActive={handleHoverChange}
                                sx={{
                                  fontSize: "40px",
                                  lineHeight: "0.8",
                                }}
                                emptyIcon={
                                  <StarIcon
                                    style={{ color: "#a8b0d3" }}
                                    fontSize="inherit"
                                  />
                                }
                              />
                            </div>
                            <textarea
                              value={comment}
                              onChange={handleCommentChange}
                              className="w-full h-40 p-2 border border-gray-300 rounded bg-[#19172c] text-[#a8b0d3] focus:outline-none focus:border-[#51438b]"
                              placeholder="Write your review here..."
                            />
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              className="text-white font-roboto text-md"
                              variant="light"
                              onPress={onReviewAlwaysClose}
                            >
                              Close
                            </Button>
                            <Button
                              className="bg-nbTheme text-md font-roboto shadow-lg shadow-indigo-500/20 text-white"
                              onPress={() => {
                                if (
                                  ratingValue === 0 &&
                                  comment.trim() === ""
                                ) {
                                  toast.error(
                                    "Please provide a rating and comment before submitting."
                                  );
                                } else if (ratingValue === 0) {
                                  toast.error(
                                    "Please provide a rating before submitting."
                                  );
                                } else if (comment.trim() === "") {
                                  toast.error(
                                    "Please provide a comment before submitting."
                                  );
                                } else {
                                  reviewHandler();
                                  onReviewAlwaysClose();
                                }
                              }}
                            >
                              Submit Review
                            </Button>
                          </ModalFooter>
                        </>
                      )}
                    </ModalContent>
                  </Modal>
                </div>
                <hr className="border-gray-600" />
                <div className="w-full">
                  {product && product.reviews && product.reviews.length > 0 ? (
                    <>
                      <div
                        ref={reviewRef}
                        className={`${
                          product.reviews.length > 5 && isExpanded
                            ? "overflow-y-auto h-[470px]"
                            : ""
                        }`}
                      >
                        <ListReviews
                          reviews={product.reviews
                            .sort(
                              (a, b) =>
                                new Date(b.dateReviewed) -
                                new Date(a.dateReviewed)
                            )
                            .slice(0, visibleReviewCount)}
                        />
                      </div>

                      {showReviewMoreButton && (
                        <div className="relative flex items-center mt-3">
                          <hr className="flex-grow border-t border-gray-600" />
                          <span
                            onClick={handleToggleSeeMore}
                            className="text-nbTheme text-md cursor-pointer hover:underline px-4"
                          >
                            {isExpanded ? "See Less" : "See More"}
                          </span>
                          <hr className="flex-grow border-t border-gray-600" />
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="mt-3 bg-nbTheme rounded p-3 border-1 border-[#3e326e]">
                      <p className="text-white">
                        We appreciate your interest in our product. Please note
                        that this product is new and has not yet garnered any
                        reviews. However, we are confident in its quality and
                        believe it offers great value. If you choose to make a
                        purchase, we would be eager to receive your feedback.
                      </p>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
