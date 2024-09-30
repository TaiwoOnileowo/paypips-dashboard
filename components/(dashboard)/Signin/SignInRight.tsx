import React from "react";
import SignInForm from "../Forms/SignInForm";

const SignInRight = async () => {
  return (
    <div className="flex items-center max-lg:justify-center px-12 lg:px-24 xl:px-32">
      <div className="container md:max-w-xs lg:max-w-sm xl:max-w-xs">
        <h1 className="font-plus text-3xl font-bold   max-lg:text-center">
          Nice to see you!
        </h1>
        <p className="text-harsh text-sm mt-2  max-lg:break-words max-lg:text-center">
          Enter your email and password{" "}
          <br className="hidden max-[350px]:block" />
          to sign in
        </p>
        <SignInForm />
      </div>
    </div>
  );
};

export default SignInRight;
