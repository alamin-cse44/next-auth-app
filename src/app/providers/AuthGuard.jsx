"use client"

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Define routes that require authentication
const protectedRoutes = ["/dashboard", "/my-bookings", "/services"];

const AuthGuard = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  console.log("status", status);
  console.log("pathname", router.pathname);

  useEffect(() => {
    if (
      status === "unauthenticated" &&
      protectedRoutes.includes(router.pathname)
    ) {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
};

export default AuthGuard;
