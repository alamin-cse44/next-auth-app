"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import DashboardLayout from "@/app/components/DashboardLayout";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

const page = () => {
  const session = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const openModalWithItem = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const fetchData = async () => {
    try {
      const res = await axios
        .get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/all-orders/api/get-all`
        )
        .then((response) => {
          console.log("orders", response);
          setProducts(response?.data?.data || []);
        });
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (!session?.data?.user?.email) {
      return;
    }

    fetchData();
  }, [session?.data?.user?.email]);
  return (
    <DashboardLayout>
      <div className="h-screen">
        {!products.length ? (
          <p className="mt-5">You have no Order to show</p>
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
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Address</th>
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
                        <button
                          onClick={() => openModalWithItem(product)}
                          className=""
                        >
                          <MdOutlineProductionQuantityLimits size={30} />
                        </button>
                      </td>
                      <td>{product.name}</td>
                      <td>{product.phone}</td>
                      <td>{product.address}</td>
                      <th>
                        {/* <div className="flex gap-2 items-center">
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
                        </div> */}
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {isModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="modal-box w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold mb-4">My Products</h2>
                    <button
                      type="button"
                      className="btn btn-sm btn-primary"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="overflow-x-auto mt-10">
                    <table className="table">
                      {/* head */}
                      <thead>
                        <tr>
                          <th></th>
                          <th>Product</th>
                          <th>Price</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* row 1 */}
                        {selectedItem?.products?.map((item, idx) => (
                          <tr key={item._id}>
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
                                      src={item.productImage}
                                      alt={item.productName}
                                      className="w-16 h-16 rounded object-cover mr-4"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div className="font-bold">
                                    {item.productName}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>{item.productPrice}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default page;
