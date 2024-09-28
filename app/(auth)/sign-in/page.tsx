import React from "react";

import SignInLeft from "@/components/Signin/SignInLeft";
import SignInRight from "@/components/Signin/SignInRight";
const Page = async () => {
  return (
    <div
      className="w-full h-screen relative grid lg:grid-cols-2 font-plus text-white"
      style={{
        background:
          "linear-gradient(159deg, #0F123B 14.25%, #090D2E 56.45%, #020515 86.14%)",
      }}
    >
      <SignInLeft />
      <SignInRight />
    </div>
  );
};

export default Page;
