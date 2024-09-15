"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Page = () => {
  const session = useSession();
  const [bookings, setBookings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const openModalWithItem = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      phone: selectedItem?.phone,
      address: selectedItem?.address,
      date: new Date().toISOString().split("T")[0],
    },
  });

  const fetchData = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/my-bookings/api/${session?.data?.user?.email}`
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
    let res;
    const deleteBooking = async () => {
      res = await fetch(
        `http://localhost:3000/pages/my-bookings/api/booking/${id}`,
        { method: "DELETE" }
      );
      console.log(res);
    };

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBooking();
        fetchData();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const onSubmit = async (data) => {
    const updateDoc = {
      phone: data.phone,
      address: data.address,
      date: data.date,
    };
    const update = await fetch(
      `http://localhost:3000/pages/my-bookings/api/booking/${selectedItem._id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateDoc),
      }
    );
    
    fetchData();
    console.log("Form Data:", update);
    reset();
    setIsModalOpen(false);
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
              <th>Date</th>
              <th>Price</th>
              <th>Address</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {bookings.map((booking, idx) => (
              <tr key={booking._id}>
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
                <td>{booking.date}</td>
                <td>{booking.price}</td>
                <td>{booking.address}</td>
                <td>{booking.phone}</td>
                <th>
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => openModalWithItem(booking)}
                      className="btn btn-success btn-md"
                    >
                      Edit
                    </button>
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
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="modal-box w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
              Update Booking for {selectedItem.serviceTitle}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  {...register("phone")}
                  placeholder="Phone"
                  className="input input-bordered w-full mt-1 focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  type="address"
                  id="address"
                  {...register("address")}
                  placeholder="Address"
                  className="input input-bordered w-full mt-1 focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="date"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  {...register("date")}
                  placeholder="Date"
                  className="input input-bordered w-full mt-1 focus:outline-none"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="btn btn-secondary mr-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
