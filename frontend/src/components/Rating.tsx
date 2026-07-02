import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Rating = ({ value, text }: { value: number; text: number }) => {
  return (
    <div className=" flex gap-2 items-center ">
      <div className="flex gap-1">
        <span>
          {value >= 1 ? (
            <FaStar className="text-amber-500" />
          ) : value >= 0.5 ? (
            <FaStarHalfAlt className="text-amber-500" />
          ) : (
            <FaRegStar className="text-amber-500" />
          )}
        </span>
        <span>
          {value >= 2 ? (
            <FaStar className="text-amber-500" />
          ) : value >= 1.5 ? (
            <FaStarHalfAlt className="text-amber-500" />
          ) : (
            <FaRegStar className="text-amber-500" />
          )}
        </span>
        <span>
          {value >= 3 ? (
            <FaStar className="text-amber-500" />
          ) : value >= 2.5 ? (
            <FaStarHalfAlt className="text-amber-500" />
          ) : (
            <FaRegStar className="text-amber-500" />
          )}
        </span>
        <span>
          {value >= 4 ? (
            <FaStar className="text-amber-500" />
          ) : value >= 3.5 ? (
            <FaStarHalfAlt className="text-amber-500" />
          ) : (
            <FaRegStar className="text-amber-500" />
          )}
        </span>
        <span>
          {value >= 5 ? (
            <FaStar className="text-amber-500" />
          ) : value >= 4.5 ? (
            <FaStarHalfAlt className="text-amber-500" />
          ) : (
            <FaRegStar className="text-amber-500" />
          )}
        </span>
      </div>
      <span>{text && text} reviews</span>
    </div>
  );
};

export default Rating;
