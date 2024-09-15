"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoCartOutline } from "react-icons/io5";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();
  // console.log("session", session);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="bg-white shadow-md ">
      <div className="max-w-7xl container mx-auto ">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="-ml-2 mr-2 flex items-center md:hidden">
              <button
                onClick={toggleMenu}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {/* Icon for menu toggle */}
                <svg
                  className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold">
                <Image
                  src="/assets/logo.svg"
                  alt="logo"
                  height={60}
                  width={60}
                />
              </Link>
            </div>
          </div>
          <div className="hidden md:ml-6 md:flex md:space-x-8">
            <Link
              href="/"
              className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              About
            </Link>
            <Link
              href="/my-bookings"
              className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              My Bookings
            </Link>
            <Link
              href="/contact"
              className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Contact
            </Link>
          </div>
          <div className="flex items-center gap-4 cursor-pointer">
            <IoCartOutline size={25} />
            <Link href="api/auth/signup">
              <button className="btn btn-primary btn-outline rounded-md btn-md">
                Appointment
              </button>
            </Link>
            {!session?.data?.user ? (
              <div className="flex items-center">
                <Link href="/login">
                  <button className="btn ml-4 bg-blue-500 text-white  rounded-md text-sm font-medium hover:bg-blue-600">
                    Login
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center">
                <p>
                  {session.data.user.name} - {session.data.user.type}
                </p>
                <Link onClick={() => signOut()} href="/">
                  <button className="btn btn-primary">Logout</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="text-gray-800 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-800 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </Link>
            <Link
              href="/my-bookings"
              className="text-gray-800 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium"
            >
              My Bookings
            </Link>
            <Link
              href="/contact"
              className="text-gray-800 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium"
            >
              Contact
            </Link>
            {!session?.data?.user ? (
              <div className="flex items-center">
                <Link href="/login">
                  <button className="btn ml-4 bg-blue-500 text-white  rounded-md text-sm font-medium hover:bg-blue-600">
                    Login
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center">
                <p>
                  {session.data.user.name} - {session.data.user.type}
                </p>
                <Link onClick={() => signOut()} href="/">
                  <button className="btn btn-primary">Logout</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
