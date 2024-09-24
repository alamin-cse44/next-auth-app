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
  const [loading, setLoading] = useState(false);
  const openModalWithItem = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: selectedItem?.name,
      price: selectedItem?.price,
    },
  });

  const handleDelete = async (id) => {
    if (!session?.data?.user?.type === "admin" || !session?.data?.user?.type) {
      Swal.fire({
        title: "Error",
        text: "You are not allowed to delete",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    let res;
    const deleteProduct = async () => {
      res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/add-product/api/product/${id}`
      );
      // console.log("delete response ", res);
      if (res.status === 200) {
        setLoading(false);
        fetchData();
        Swal.fire({
          title: "Deleted!",
          text: "Your product has been deleted.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Failed to delete product",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
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
        setLoading(true);
        deleteProduct();
      }
    });
  };

  const handleUpdate = async (data) => {
    setLoading(true);
    const updateDoc = {
      name: data.name ? data.name : selectedItem?.name,
      price: data.price ? data.price : selectedItem?.price,
    };
    const update = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/add-product/api/product/${selectedItem._id}`,
      updateDoc,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    fetchData();
    // console.log("Form Data:", update);
    if (update.data.data.modifiedCount > 0) {
      setLoading(false);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your product is successfully updated",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    reset();
    setIsModalOpen(false);
  };

  return (
    <>
      {!products.length || loading ? (
        <p className="mt-5">Loading.....</p>
      ) : (
        <div className=" mt-2 bg-white">
          <div className="overflow-x-auto mt-10 sm:w-full w-[320px]">
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
                  Update Product for {selectedItem.name}
                </h2>
                <form onSubmit={handleSubmit(handleUpdate)}>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register("name")}
                      placeholder={selectedItem?.name}
                      className="input input-bordered w-full mt-1 focus:outline-none"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="address"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      {...register("price", {
                        min: { value: 1, message: "Price must be at least 1" },
                      })}
                      placeholder={selectedItem?.price}
                      className="input input-bordered w-full mt-1 focus:outline-none"
                    />
                  </div>
                  {/* <div className="mb-4">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="date"
                    >
                      Image
                    </label>
                    <input
                      id="file"
                      name="file"
                      type="file"
                      {...register("file", { required: "Picture is required" })}
                      placeholder={selectedItem?.image}
                      className="input input-bordered w-full mt-1 py-2 focus:outline-none"
                    />
                  </div> */}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="btn btn-secondary mr-2"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {loading ? "Wait for updating" : "Submit"}
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
