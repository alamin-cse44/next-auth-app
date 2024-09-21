"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import DashboardNavbar from "./DashboardNavbar";
import { FaBars, FaHome, FaJediOrder, FaTimes, FaUserFriends } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";
import { RiDashboard3Line } from "react-icons/ri";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const pathname = usePathname();
  const { data } = useSession();
  console.log("session: ", data);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed z-30 inset-y-0 left-0 w-64 bg-white  transform transition-transform duration-300 ease-in-out 
          ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
      >
        <div className="p-4 ms-2 text-xl font-semibold  text-primary flex justify-between items-center">
          <Link href={"/dashboard"}>Dashboard</Link>
          {/* Close Button for Mobile */}
          <button className="md:hidden" onClick={toggleSidebar}>
            <FaTimes className="text-primary text-xl" />
          </button>
        </div>
        <nav className="mt-6">
          <ul>
            <li className="p-2">
              <Link
                href="/"
                className="flex items-center gap-2 hover:bg-primary hover:text-white px-4 py-2 rounded-lg"
              >
                <FaHome size={20} /> Home
              </Link>
            </li>

            <li className="p-2">
              <Link
                href="/dashboard"
                className={`${
                  pathname === "/dashboard"
                    ? "bg-primary text-white"
                    : "bg-white"
                } flex items-center gap-2 hover:bg-primary hover:text-white px-4 py-2 rounded-lg`}
              >
                <RiDashboard3Line size={20} /> Dashboard
              </Link>
            </li>

            <li className="p-2">
              <Link
                href="/dashboard/add-product"
                className={`${
                  pathname === "/dashboard/add-product"
                    ? "bg-primary text-white"
                    : "bg-white"
                } flex items-center gap-2 hover:bg-primary hover:text-white px-4 py-2 rounded-lg`}
              >
                <AiOutlineProduct size={20} />
                Add Product
              </Link>
            </li>

            <li className="p-2">
              <Link
                href="/dashboard/orders"
                className={`${
                  pathname === "/dashboard/orders"
                    ? "bg-primary text-white"
                    : "bg-white"
                } flex items-center gap-2 hover:bg-primary hover:text-white px-4 py-2 rounded-lg`}
              >
                <FaJediOrder size={20} />
                My Orders
              </Link>
            </li>

            <li className="p-2">
              <Link
                href="/dashboard/users"
                className="flex items-center gap-2 hover:bg-primary hover:text-white px-4 py-2 rounded-lg"
              >
                <FaUserFriends size={20} />
                Users
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Mobile Header with Hamburger Icon */}
        <header className="px-4 bg-white shadow-md md:hidden flex justify-between">
          <button
            onClick={toggleSidebar}
            className="text-gray-700 focus:outline-none"
          >
            <FaBars className="text-2xl" />
          </button>
          <DashboardNavbar />
        </header>
        <div className="md:block hidden">
          <DashboardNavbar />
        </div>
        {pathname === "/dashboard" && (
          <div className="container bg-gray-200 h-screen">
            <h2 className="text-lg font-bold mt-3">
              Welcome, <span className="text-primary">{data?.user?.name}</span>
            </h2>
          </div>
        )}
        <main className="flex-1 p-6 bg-gray-200">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
