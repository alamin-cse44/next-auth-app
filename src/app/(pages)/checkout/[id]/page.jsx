"use client";

import { getServiceById } from "@/services/getServices";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

// export const metadata = {
//   title: "Service Checkout",
//   description: "Service Details Page",
// };

// Define the Yup validation schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  date: yup.date().required("Date is required"),
  phone: yup
    .string()
    .matches(/^[0-9-]+$/, "Invalid phone number")
    .required("Phone number is required"),
  address: yup.string().required("Address is required"),
  //   price: yup.string().required("Price is required"),
});

const Checkout = ({ params }) => {
  const [services, setServices] = useState([]);
  const session = useSession();
  console.log("checkout session", session);

  useEffect(() => {
    if (!session?.data?.user?.email) {
      return;
    }
  }, [session?.data?.user?.email]);

  useEffect(() => {
    if (!session?.data?.user?.email) {
      return;
    }
    const fetchData = async () => {
      try {
        const res = await getServiceById(params.id);
        setServices(res?.data || []);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, [session?.data?.user?.email]);
  const { _id, title, img, price, description, facility } = services;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: session?.data?.user?.name,
      email: session?.data?.user?.email,
      date: new Date().toISOString().split("T")[0],
      phone: "",
      address: "",
      price: price,
    },
    resolver: yupResolver(schema),
  });

  // Function to handle form submission
  const onSubmit = (data) => {
    const newBooking = {
      name: data.name,
      email: data.email,
      date: data.date,
      phone: data.phone,
      address: data.address,
      price: price,
      serviceTitle: title,
      img: img,
      serviceId: _id,
    };
    // console.log("Form Data:", newBooking);
    const res = axios
      .post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/checkout/api/new-booking`,
        newBooking,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("booking response:", response.data);
        if (response.data.data) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your booking has been added successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: err.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  return (
    <div className="container mx-auto mt-2">
      {/* banner part */}
      <div className="relative w-full h-[300px] rounded-lg">
        {/* Background Image */}
        <Image
          src={img} // Replace with your image path
          alt="Service Details Background"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
          priority // Loads the image quickly as it's likely above the fold
        />

        {/* Overlay for text */}
        <div className="absolute inset-0 pl-8 bg-black bg-opacity-50 flex flex-col justify-center">
          <h1 className="text-white text-4xl font-bold">Checkout of {title}</h1>
        </div>
        <div className="absolute bottom-0 justify-center items-center flex mt-2">
          <div className="bg-primary text-white py-2 px-4 rounded-t-full">
            Home / Service Details
          </div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mt-10 mx-auto p-6 lg:py-16 lg:px-32 bg-gray-100 rounded-md"
      >
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              {...register("name", { required: true })}
              placeholder="Name"
              className="p-2 w-full border rounded-md focus:outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              {...register("email", { required: true })}
              type="email"
              placeholder="Email"
              className="p-2 w-full border rounded-md focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-6 mt-4">
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date
            </label>
            <input
              id="date"
              {...register("date", { required: true })}
              type="date"
              className="p-2 w-full border rounded-md focus:outline-none"
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              id="phone"
              {...register("phone", { required: true })}
              placeholder="Phone"
              className="p-2 w-full border rounded-md focus:outline-none"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>
        <div className="mt-6">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <input
            id="address"
            {...register("address", { required: true })}
            placeholder="Address"
            className="p-2 w-full border rounded-md focus:outline-none"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>
        <div className="mt-6">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            id="price"
            // {...register("price", { required: true })}
            placeholder={price}
            value={price}
            readOnly
            className="p-2 w-full border rounded-md focus:outline-none"
          />
          {/* {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )} */}
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md"
          >
            Order Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
