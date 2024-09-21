"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useCartQuery, useDeleteCartMutation } from "@/services/useCart";

const Cart = ({ openCanvas, toggleOffCanvas }) => {
  const session = useSession();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModalWithItem = () => {
    setIsModalOpen(true);
  };

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {},
  });

  const { data: cartItems, isLoading } = useCartQuery(session);
  const deleteCartMutation = useDeleteCartMutation();
  const [deleteResponse, setDeleteResponse] = useState(null);
  console.log("cartts length: ", cartItems?.length);

  useEffect(() => {
    if (!session?.data?.user?.email) {
      return;
    }
  }, [session?.data?.user?.email]);

  const handleDelete = async (productId) => {
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
        deleteCartMutation.mutate(productId, {
          onSuccess: (data) => {
            setDeleteResponse(data.message);
            Swal.fire({
              title: "Deleted!",
              text: "Your item deleted successfully.",
              icon: "success",
            });
          },
          onError: (error) => {
            Swal.fire({
              title: "Deleted!",
              text: "Failed to deleted item.",
              icon: "success",
            });
          },
        });
      }
    });
  };

  const handleOrder = async (data) => {
    // const updateDoc = {
    //   phone: data.phone ? data.phone : selectedItem?.phone,
    //   address: data.address ? data.address : selectedItem?.address,
    //   date: data.date,
    // };
    // const update = await axios.patch(
    //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/my-bookings/api/booking/${selectedItem._id}`,
    //   updateDoc,
    //   {
    //     headers: { "Content-Type": "application/json" },
    //   }
    // );

    // fetchData();
    // console.log("Form Data:", update);
    // if (update.data.data.modifiedCount > 0) {
    //   Swal.fire({
    //     position: "top-end",
    //     icon: "success",
    //     title: "Your booking is successfully updated",
    //     showConfirmButton: false,
    //     timer: 1500,
    //   });
    // }
    reset();
    setIsModalOpen(false);
  };

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
          <h2 className="text-xl font-bold ">
            Cart items : {cartItems?.length}
          </h2>
          <button className="btn btn-sm btn-primary " onClick={toggleOffCanvas}>
            Close
          </button>
        </div>

        <div className="divider p-0"></div>

        {/* Off-canvas content, scrollable */}
        <div className="px-4 overflow-y-auto h-[calc(100vh-50px)] relative">
          {isLoading ? (
            <h1 className="mt-0">Loading.....</h1>
          ) : (
            <div className="overflow-x-auto mt-0 h-[380px]">
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
                  {cartItems?.map((item, idx) => (
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
                                onClick={() => handleDelete(item._id)}
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
                {cartItems?.reduce(
                  (acc, curr) => acc + parseFloat(curr.productPrice),
                  0
                )}
              </h2>
              <button
                onClick={() => openModalWithItem()}
                className="btn btn-primary btn-block mt-4"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* moddal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="modal-box w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Your Information</h2>
            <form onSubmit={handleSubmit(handleOrder)}>
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
                  placeholder=""
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
    </>
  );
};

export default Cart;
