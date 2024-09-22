// components/ProfileCard.js

import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const UserProfile = ({ user }) => {
  return (
    <div className="w-96 bg-white rounded-lg shadow-lg p-6 relative">
      {/* Profile Image */}
      <div className="flex justify-center">
        <Image
          src={user?.image} // Change the src to your image
          alt="Profile Image"
          width={100}
          height={100}
          className="rounded-full border-4 border-white shadow-md"
        />
      </div>

      {/* User Info */}
      <div className="text-center mt-4">
        <h2 className="text-lg font-semibold">{user?.name}</h2>
        <p className="text-gray-500">{user?.email}</p>
      </div>

      {/* Control Panel and Subscription */}
      <div className="flex justify-center space-x-2 mt-4 text-blue-500 text-sm">
        <a href="#" className="hover:underline">
          Control Panel
        </a>
        <span>•</span>
        <a href="#" className="hover:underline">
          Subscription
        </a>
      </div>

      {/* Buttons */}
      <div className="flex justify-center space-x-4 mt-6">
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 py-2 px-4 rounded-lg">
          My Account
        </button>
        <Link onClick={() => signOut()} href="/">
          <button className="btn  btn-primary">Logout</button>
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
