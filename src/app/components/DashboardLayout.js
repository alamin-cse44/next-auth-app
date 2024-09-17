"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import DashboardNavbar from "./DashboardNavbar";

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
        <div className="p-4 text-xl font-semibold  text-primary flex justify-between items-center">
          <Link href={"/dashboard"}>Dashboard</Link>
          {/* Close Button for Mobile */}
          <button className="md:hidden" onClick={toggleSidebar}>
            <FaTimes className="text-primary text-xl" />
          </button>
        </div>
        <nav className="mt-6">
          <ul>
            <li className="p-4 hover:bg-primary hover:text-white">
              <Link href="/">Home</Link>
            </li>
            <li className="p-4 hover:bg-primary hover:text-white">
              <Link href="/dashboard/add-product">Add Product</Link>
            </li>
            <li className="p-4 hover:bg-primary hover:text-white">
              <Link href="/dashboard/users">Users</Link>
            </li>
            {/* Add more items as necessary */}
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
