"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const Cart = ({ openCanvas, toggleOffCanvas }) => {
  const [carts, setCarts] = useState([]);
  const session = useSession();
  const fetchData = async () => {
    try {
      const res = await axios
        .get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/api/${session?.data?.user?.email}`
        )
        .then((response) => {
          console.log("carts", response.data.data);
          setCarts(response?.data?.data || []);
        });
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
  return (
    <>
      {/* Off-canvas overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity bg-black bg-opacity-50 ${
          openCanvas ? "block" : "hidden"
        }`}
        onClick={toggleOffCanvas} // Click outside to close the off-canvas
      ></div>

      {/* Off-canvas content (Right side) */}
      <div
        className={`fixed top-0 right-0 z-50 w-80 h-full bg-white shadow-lg transform transition-transform ease-in-out duration-300 ${
          openCanvas ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="flex items-center justify-between p-2">
          <h2 className="text-xl font-bold ">Cart</h2>
          <button className="btn btn-sm btn-primary " onClick={toggleOffCanvas}>
            Close
          </button>
        </div>

        <div className="divider p-0"></div>

        {/* Off-canvas content, scrollable */}
        <div className="p-4 overflow-y-auto h-[calc(100vh-50px)]">
          {carts.length}
        </div>
      </div>
    </>
  );
};

export default Cart;
