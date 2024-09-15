import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";

const Page = async () => {
  const session = await getServerSession(authOptions);
  console.log("about page session: ", session);
  return (
    <div>
      <h2>About us page update!</h2>
    </div>
  );
};

export default Page;
