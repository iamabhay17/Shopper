import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

const Rating = ({ rating, text }) => {
  return (
    <div className="rating">
      <span>
        {rating >= 1 ? (
          <AiFillStar className="icon rating-icon" />
        ) : rating > 0.5 ? (
          <BsStarHalf className="icon rating-icon" />
        ) : (
          <AiOutlineStar className="icon rating-icon" />
        )}
        {rating >= 2 ? (
          <AiFillStar className="icon rating-icon" />
        ) : rating > 1.5 ? (
          <BsStarHalf className="icon rating-icon" />
        ) : (
          <AiOutlineStar className="icon rating-icon" />
        )}
        {rating >= 3 ? (
          <AiFillStar className="icon rating-icon" />
        ) : rating > 2.5 ? (
          <BsStarHalf className="icon rating-icon" />
        ) : (
          <AiOutlineStar className="icon rating-icon" />
        )}
        {rating >= 4 ? (
          <AiFillStar className="icon rating-icon" />
        ) : rating > 3.5 ? (
          <BsStarHalf className="icon rating-icon" />
        ) : (
          <AiOutlineStar className="icon rating-icon" />
        )}
        {rating >= 5 ? (
          <AiFillStar className="icon rating-icon" />
        ) : rating > 4.5 ? (
          <BsStarHalf className="icon rating-icon" />
        ) : (
          <AiOutlineStar className="icon rating-icon" />
        )}
      </span>

      <span>
        <small>{text}</small>
      </span>
    </div>
  );
};

export default Rating;
