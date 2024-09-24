"use client";

import { useAddCartMutation } from "@/services/useCart";
import { useSession } from "next-auth/react";
import { BsFillCartCheckFill } from "react-icons/bs";
import Swal from "sweetalert2";

const ProductsCard = ({ product }) => {
  const { name, image, price } = product;
  const { data } = useSession();
  const addCartMutation = useAddCartMutation();
  const handleAddToCart = () => {
    if (!data?.user?.name) {
      Swal.fire({
        title: "Excuse me!",
        text: "Please sign up first.",
        icon: "error",
      });
      return;
    }
    const cartData = {
      customerName: data?.user?.name,
      email: data?.user?.email,
      productName: name,
      productPrice: price,
      productImage: image,
    };
    console.log("Added to cart:", cartData);
    addCartMutation.mutate(cartData, {
      onSuccess: (data) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your product is added to cart",
          showConfirmButton: false,
          timer: 1500,
        });
      },
      onError: (error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      },
    });
  };
  return (
    <div className="card bg-base-100 shadow-lg border border-gray-200 rounded-lg relative">
      {/* Card Image */}
      <figure className="px-6 pt-6 bg-gray-400 m-3">
        <img src={image} alt={name} className="rounded-lg w-52 h-52 " />
      </figure>

      {/* Card Body */}
      <div className="card-body items-center text-center">
        <div className="absolute right-4 top-4 bg-slate-100 p-1 cursor-pointer">
          <BsFillCartCheckFill onClick={() => handleAddToCart()} size={40} />
        </div>
        {/* Star Rating */}
        <div className="rating">
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star-2 bg-orange-400"
            defaultChecked={true}
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
