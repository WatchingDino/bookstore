import React from "react";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

const ListReviews = ({ reviews }) => {
  return (
    <div className="">
      {reviews.map((review, index) => (
        <div key={review._id} className="text-md mt-3">
          <div className="flex justify-between items-center pb-3">
            <div className="flex items-center">
              <p className="font-semibold me-5">{review.name}</p>
              <div className="flex items-center">
                <span className="ms-2 text-muted me-1">
                  {review?.rating !== undefined
                    ? review.rating % 1 === 0
                      ? review.rating.toFixed(0)
                      : review.rating.toFixed(1)
                    : ""}
                </span>
                <Rating
                  name="half-rating"
                  value={review.rating}
                  precision={0.1}
                  readOnly
                  sx={{
                    fontSize: "22px",
                    lineHeight: "0.8",
                    marginTop: "-2px",
                  }}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
              </div>
            </div>
            <p className="text-sm text-gray-500 pr-5">
              {timeAgo.format(new Date(review.dateReviewed))}
            </p>
          </div>

          <p className="text-gray-700 mb-3">{review.comment}</p>

          {index !== reviews.length - 1 && <hr className="border-gray-600" />}
        </div>
      ))}
    </div>
  );
};

export default ListReviews;
