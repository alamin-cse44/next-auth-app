"use client";

import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";

const SocialAppLogin = () => {
  const router = useRouter();
  const session = useSession();
  const handleSocialLogin = async (provider) => {
    const res = await signIn(provider);
  };

  if (session.status === "authenticated") {
    router.push("/");
  }

  return (
    <div className="flex items-center justify-center space-x-3 ">
      <button
        onClick={() => handleSocialLogin("google")}
        className="btn btn-circle"
      >
        <FcGoogle size={20} />
      </button>
      <button
        onClick={() => handleSocialLogin("github")}
        className="btn btn-circle"
      >
        <FaGithub size={20} />
      </button>
    </div>
  );
};

export default SocialAppLogin;
