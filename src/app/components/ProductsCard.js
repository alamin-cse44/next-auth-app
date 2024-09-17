"use client"

import { BsFillCartCheckFill } from "react-icons/bs";

const ProductsCard = ({ product }) => {
  const { name, image, price } = product;
  const handleAddToCart = () => {
    // Add product to cart
    console.log("Added to cart:", product);
  };
  return (
    <div className="card bg-base-100 shadow-lg border border-gray-200 rounded-lg relative">
      {/* Card Image */}
      <figure className="px-6 pt-6 bg-gray-400 m-3">
        <img src={image} alt={name} className="rounded-lg w-52 h-52 " />
      </figure>

      {/* Card Body */}
      <div
        onClick={() => handleAddToCart()}
        className="card-body items-center text-center cursor-pointer"
      >
        <div className="absolute right-4 top-4 bg-slate-100 p-1">
          <BsFillCartCheckFill size={40} />
        </div>
        {/* Star Rating */}
        <div className="rating">
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star-2 bg-orange-400"
            checked
          />
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star-2 bg-orange-400"
          />
        </div>

        {/* Product Name */}
        <h2 className="card-title mt-2">{name}</h2>

        {/* Price */}
        <p className="text-red-500 font-semibold">${price}</p>
      </div>
    </div>
  );
};

export default ProductsCard;
