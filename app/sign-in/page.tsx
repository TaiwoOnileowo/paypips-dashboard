import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import React from "react";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
const Page = () => {
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
          backgroundImage: "url('/images/signinimg.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="flex items-center flex-col justify-center px-10 max-lg:hidden"
      >
        <p className=" uppercase auth-helper-text">Paypips</p>
        <h1 className="auth-text mt-2 uppercase text-center">
          The Future of Forex Group Management
        </h1>
      </div>
      <div className="flex items-center max-lg:justify-center px-12 lg:px-24 xl:px-32">
        <div className="container md:max-w-xs lg:max-w-sm xl:max-w-xs">
          <h1 className="font-plus text-3xl font-bold   max-lg:text-center">
            Nice to see you!
          </h1>
          <p className="text-harsh text-sm mt-2  max-lg:break-words max-lg:text-center">
            Enter your email and password <br className="hidden max-[350px]:block"/>to sign in
          </p>

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
            Sign In
          </button>
          <p className="mt-4 text-harsh text-sm flex justify-center w-full ">
            Don&apos;t have an account?{" "}
            <Link href={"/sign-up"} className="text-white cursor-pointer ml-1">
              {" "}
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
