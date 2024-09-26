import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import React from "react";
import { signIn } from "@/auth";

import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import SignInLeft from "@/components/Signin/SignInLeft";
import SignInRight from "@/components/Signin/SignInRight";
const Page = () => {
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
