"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [bookings, setBookings] = useState([]);
  const session = useSession();
  console.log(session?.data?.user?.email);
  // Fetch services data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/pages/my-bookings/api/${session?.data?.user?.email}`
        );
        const data = await res.json();
        setBookings(data?.data || []);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  console.log("bookings", bookings);
  return (
    <div className="container mx-auto mt-2">
      {/* banner part */}
      <div className="relative w-full h-[300px] rounded-lg">
        {/* Background Image */}
        <Image
          src={"/assets/images/about_us/parts.jpg"} // Replace with your image path
          alt="Service Details Background"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
          priority // Loads the image quickly as it's likely above the fold
        />

        {/* Overlay for text */}
        <div className="absolute inset-0 pl-8 bg-black bg-opacity-50 flex flex-col justify-center">
          <h1 className="text-white text-4xl font-bold">My Bookings</h1>
        </div>
        <div className="absolute bottom-0 justify-center items-center flex mt-2">
          <div className="bg-primary text-white py-2 px-4 rounded-t-full">
            Home / Service Details
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
