"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

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
          <h2 className="text-xl font-bold ">Cart items : {carts.length}</h2>
          <button className="btn btn-sm btn-primary " onClick={toggleOffCanvas}>
            Close
          </button>
        </div>

        <div className="divider p-0"></div>

        {/* Off-canvas content, scrollable */}
        <div className="px-4 overflow-y-auto h-[calc(100vh-50px)] relative">
          {!carts.length ? (
            <h1 className="mt-0">Loading.....</h1>
          ) : (
            <div className="overflow-x-auto mt-0">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {carts.map((item, idx) => (
                    <tr key={item._id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img
                                src={item.productImage}
                                alt={item.productName}
                                className="w-16 h-16 rounded object-cover mr-4"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{item.productName}</div>
                            <div className="flex items-center">
                              1 item x {item.productPrice}
                              <FaBangladeshiTakaSign
                                className="ms-1"
                                size={12}
                              />{" "}
                            </div>
                          </div>
                        </div>
                      </td>
                      <th>
                        <div className="flex gap-2 items-center">
                          <MdDelete
                            className="cursor-pointer"
                            onClick={() => handleDelete(item._id)}
                            size={20}
                          />
                        </div>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="absolute bottom-16 w-[90%]">
            <div className="">
              <h2 className="text-lg font-bold">
                Sub Total Price :{" "}
                {carts.reduce(
                  (acc, curr) => acc + parseFloat(curr.productPrice),
                  0
                )}
              </h2>
              <button className="btn btn-primary btn-block mt-4">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
