"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const HandleProducts = ({ products, fetchData }) => {
  const session = useSession();
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

  const handleDelete = async (id) => {
    let res;
    const deleteBooking = async () => {
      res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/my-bookings/api/booking/${id}`
      );
      console.log(res);
      if (res.status === 200) {
        fetchData();
        Swal.fire({
          title: "Deleted!",
          text: "Your booking has been deleted.",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Failed to delete booking",
          icon: "error",
        });
      }
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
      }
    });
  };

  const onSubmit = async (data) => {
    const updateDoc = {
      phone: data.phone ? data.phone : selectedItem?.phone,
      address: data.address ? data.address : selectedItem?.address,
      date: data.date,
    };
    const update = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/my-bookings/api/booking/${selectedItem._id}`,
      updateDoc,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    fetchData();
    console.log("Form Data:", update);
    if (update.data.data.modifiedCount > 0) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your booking is successfully updated",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    reset();
    setIsModalOpen(false);
  };

  return (
    <>
      {!products.length ? (
        <p className="mt-5">Loading.....</p>
      ) : (
        <div className="container mx-auto mt-2">
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
                  <th>Product</th>
                  <th>Price</th>
                  <th>Offer</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {products.map((product, idx) => (
                  <tr key={product._id}>
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
                              src={product.image}
                              alt={product.name}
                              className="w-16 h-16 rounded object-cover mr-4"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{product.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>{product.price}</td>
                    <td>{product.offer ? product.offer : 0}</td>
                    <th>
                      <div className="flex gap-2 items-center">
                        <button
                          onClick={() => openModalWithItem(product)}
                          className="btn btn-success btn-md"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
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
                  Update Booking for {selectedItem.name}
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
                      placeholder={selectedItem?.phone}
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
                      placeholder={selectedItem?.address}
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
      )}
    </>
  );
};

export default HandleProducts;
