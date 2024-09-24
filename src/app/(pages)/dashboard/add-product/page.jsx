"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import DashboardLayout from "@/app/components/DashboardLayout";
import axios from "axios";
import Swal from "sweetalert2";
import HandleProducts from "./_components/HandleProducts";
import { getProducts } from "@/services/getProducts";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isOffer, setIsOffer] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const data = await getProducts();
      setProducts(data?.data || []);
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error fetching products",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log("add products", products);

  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    // formData.append("image", data.file[0]);

    try {
      // Upload image to ImgBB
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();
      // console.log("image response", result);
      if (result.success) {
        const newProduct = {
          name: data.productName,
          image: result.data.url,
          price: data.price,
          offer: isOffer ? data.offer : null,
        };
        const res = axios
          .post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/add-product/api/new-product`,
            newProduct,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            if (response.data.data) {
              setLoading(false);
              fetchData();
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Product is added successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            } else {
              Swal.fire({
                position: "top-end",
                icon: "error",
                title: response.data.message,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  };

  return (
    <DashboardLayout>
      <div className="">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 bg-slate-50 shadow-md rounded p-6"
        >
          <h1 className="text-2xl font-bold mb-4">Add Product</h1>
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Product Name
            </label>
            <input
              type="text"
              {...register("productName", {
                required: "Product Name is required",
              })}
              className="input input-bordered w-full"
            />
            {errors.productName && (
              <p className="text-red-500 text-sm">
                {errors.productName.message}
              </p>
            )}
          </div>

          {/* Product Image */}
          <div className="mb-4 relative">
            <label htmlFor="file" className="block mb-1">
              Product picture
            </label>
            <input
              id="file"
              name="file"
              type="file"
              {...register("file", { required: "Picture is required" })}
              className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
            {errors.file && (
              <p className="text-red-500 text-sm">{errors.file.message}</p>
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
            {loading ? "Loading..." : "Add Product"}
          </button>
        </form>
        <HandleProducts products={products} fetchData={fetchData} />
      </div>
    </DashboardLayout>
  );
};

export default AddProduct;
