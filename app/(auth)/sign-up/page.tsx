import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import React from "react";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { redirect } from "next/navigation";
const Page = () => {
  redirect("/sign-in");
  return (
    <div
      className="w-full h-screen relative grid lg:grid-cols-2 font-plus text-white"
      style={{
        background:
          "linear-gradient(159deg, #0F123B 14.25%, #090D2E 56.45%, #020515 86.14%)",
      }}
    >
      <div
        style={{
          backgroundImage: "url('/images/signupimg.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="flex  items-center flex-col justify-center px-10 max-lg:hidden"
      >
        {" "}
        <p className=" uppercase auth-helper-text">Paypips</p>
        <h1 className="auth-text mt-2 uppercase text-center">
          Forex Group Management Like Never Before
        </h1>
      </div>
      <div className="flex items-center max-lg:justify-center px-10 lg:px-32  ">
        <div className="container lg:max-w-xs">
          <h1 className="font-plus text-3xl  max-lg:text-center font-bold">
            Welcome!
          </h1>
          <p className="text-harsh text-sm max-lg:break-words mt-2 max-lg:text-center ">
            Sign up to get started with Paypips dashboard
          </p>
          <div className="mt-4 space-y-2 ">
            <Label text="Name" htmlFor="name" />
            <Input type="text" placeholder="Your full name.." />
          </div>
          <div className="mt-4 space-y-2 ">
            <Label text="Email" htmlFor="email" />
            <Input type="text" placeholder="Your email..." />
          </div>
          <div className="mt-4 space-y-2 ">
            <Label text="Password" htmlFor="Password" />
            <Input
              type="password"
              placeholder="Your Password..."
              className="placeholder:text-harsh/20"
            />
          </div>
          <div className="flex items-center space-x-2 mt-4">
            <Switch id="remember-me" defaultChecked={true} />
            <Label htmlFor="remember-me" text="Remember Me" />
          </div>
          <button className="w-full bg-sharpBlue rounded-2xl  mt-8 text-sm uppercase font-bold font-plus p-3">
            Sign Up
          </button>
          <p className="mt-4 text-harsh text-sm flex justify-center w-full ">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-white cursor-pointer ml-1">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
