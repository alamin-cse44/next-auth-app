"use client"

import { useForm } from "react-hook-form";
import { useState } from "react";
import DashboardLayout from "@/app/components/DashboardLayout";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isOffer, setIsOffer] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input
            type="text"
            {...register("productName", {
              required: "Product Name is required",
            })}
            className="input input-bordered w-full"
          />
          {errors.productName && (
            <p className="text-red-500 text-sm">{errors.productName.message}</p>
          )}
        </div>

        {/* Product Image */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Product Image URL
          </label>
          <input
            type="text"
            {...register("productImage", {
              required: "Product Image is required",
            })}
            className="input input-bordered w-full"
          />
          {errors.productImage && (
            <p className="text-red-500 text-sm">
              {errors.productImage.message}
            </p>
          )}
        </div>

        {/* Product Price */}
        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            {...register("price", {
              required: "Price is required",
              min: { value: 1, message: "Price must be at least 1" },
            })}
            className="input input-bordered w-full"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>

        {/* Offer Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="offer"
            onChange={(e) => setIsOffer(e.target.checked)}
            className="checkbox checkbox-primary"
          />
          <label htmlFor="offer" className="ml-2">
            This product has an offer
          </label>
        </div>

        {/* Offer Percentage (Only visible if the offer is checked) */}
        {isOffer && (
          <div>
            <label className="block text-sm font-medium mb-1">
              Offer Percentage
            </label>
            <input
              type="number"
              {...register("offer", {
                required: isOffer ? "Offer percentage is required" : false,
                min: { value: 1, message: "Offer must be at least 1%" },
                max: { value: 100, message: "Offer can't exceed 100%" },
              })}
              className="input input-bordered w-full"
            />
            {errors.offer && (
              <p className="text-red-500 text-sm">{errors.offer.message}</p>
            )}
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
    </DashboardLayout>
  );
};

export default AddProduct;
