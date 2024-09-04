"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [bookings, setBookings] = useState([]);
  const session = useSession();
  console.log(session?.data?.user?.email);
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

  useEffect(() => {
    if (!session?.data?.user?.email) {
      return;
    }

    fetchData();
  }, [session?.data?.user?.email]);

  const handleDelete = async (id) => {
    const res = await fetch(
      `http://localhost:3000/pages/my-bookings/api/delete-booking/${id}`,
      { method: "DELETE" }
    );
    if (res.status === 200) {
      alert("Booking deleted successfully");
      fetchData();
    }
  };

  return (
    <div className="container mx-auto mt-2">
      {/* banner part */}
      <div className="relative w-full h-[300px] rounded-lg">
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

      <div className="overflow-x-auto mt-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                {/* <label>
                  <input type="checkbox" className="checkbox" />
                </label> */}
              </th>
              <th>Service</th>
              <th>Price</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {bookings.map((booking) => (
              <tr>
                <th>
                  {/* <label>
                    <input type="checkbox" className="checkbox" />
                  </label> */}
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={booking.img}
                          alt={booking.serviceTitle}
                          className="w-16 h-16 rounded object-cover mr-4"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{booking.serviceTitle}</div>
                    </div>
                  </div>
                </td>
                <td>{booking.price}</td>
                <td>{booking.date}</td>
                <th>
                  <div className="flex gap-2 items-center">
                    <button className="btn btn-success btn-md">Edit</button>
                    <button
                      onClick={() => handleDelete(booking._id)}
                      className="btn btn-primary btn-md"
                    >
                      Delete
                    </button>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
