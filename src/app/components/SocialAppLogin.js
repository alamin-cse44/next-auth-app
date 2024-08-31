"use client";

import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const SocialAppLogin = () => {
  const router = useRouter();

  const handleGoogleSignIn = () => {};

  const handleGithubSignIn = () => {};
  return (
    <div className="flex items-center justify-center space-x-3 ">
      <button className="btn btn-circle">
        <FcGoogle size={20} />
      </button>
      <button className="btn btn-circle">
        <FaGithub size={20} />
      </button>
    </div>
  );
};

export default SocialAppLogin;
