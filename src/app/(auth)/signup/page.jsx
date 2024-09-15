"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import Link from "next/link";
import SocialAppLogin from "@/app/components/SocialAppLogin";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  type: yup.string().required("User type is required"),
  password: yup
    .string()
    .min(6, "Password must be 6 characters or longer")
    .matches(
      /(?=.*[A-Z])(?=.*[!@#&*])(?=.*[0-9])/,
      "Password should be 6 or longer and contain upper, lower, special character, and number"
    )
    .required("Password is required"),
  file: yup.mixed().required("File is required"),
  terms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleSignup = async (data) => {
    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password,
      type: data.type,
      image: data.file,
    };

    const res = axios
      .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/signup/api`, newUser, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("signup response:", response.data);
        if (response.data.data) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "You have signup successfully",
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
  };
  return (
    <div className="grid lg:grid-cols-2 mt-2 justify-center items-center container mx-auto">
      <div className="flex items-center justify-center">
        <Image
          src={"/assets/images/login/login.svg"}
          className="rounded-lg"
          height={"500"}
          width={"460"}
          alt="signup"
        />
      </div>
      <div className="">
        <form
          onSubmit={handleSubmit(handleSignup)}
          className="bg-white p-8 rounded shadow-md max-w-md mx-auto justify-center border-2"
        >
          <h2 className="font-bold text-4xl mb-8 text-center">Sign Up</h2>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">
              Your name
            </label>
            <input
              type="text"
              id="name"
              {...register("name")}
              className="w-full p-2 border rounded"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Your email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="w-full p-2 border rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="type" className="block mb-2">
              User Type
            </label>
            <select
              id="type"
              {...register("type")}
              className="w-full p-2 border rounded"
            >
              <option value="">Choose user type</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
              <option value="member">Member</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
            )}
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password")}
                className="w-full p-2 border rounded pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-2 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <IoMdEyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <IoMdEye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="mb-4 relative">
            <label htmlFor="file" className="block mb-2">
              Upload your picture
            </label>
            <input
              id="file"
              name="file"
              type="file"
              {...register("file")}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
            {errors.file && (
              <p className="text-red-500 text-xs">{errors.file.message}</p>
            )}
          </div>
          {/* <div className="mb-4">
            <label className="flex items-center">
              <input type="checkbox" {...register('terms')} className="mr-2" />
              By signing up, you are creating an account, and you agree to the Terms of Use and Privacy Policy.
            </label>
            {errors.terms && <p className="text-red-500 text-sm mt-1">{errors.terms.message}</p>}
          </div> */}
          <button type="submit" className="w-full btn btn-primary">
            Create an account
          </button>
          <p className="text-center my-4">Or, Sign in with</p>
          <SocialAppLogin />
          <div className="text-center mt-4">
            Already have an account?{" "}
            <Link href="login" className="text-primary font-bold">
              Sign in here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
