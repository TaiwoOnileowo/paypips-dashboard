import React from "react";
import SignInForm from "../Forms/SignInForm";

const SignInRight = () => {
  return (
    <div className="flex items-center max-lg:justify-center px-10 lg:px-32  ">
      <div className="container lg:max-w-xs">
        <h1 className="font-plus text-3xl  max-lg:text-center font-bold">
          Hola!
        </h1>
        <p className="text-harsh text-sm max-lg:break-words mt-2 max-lg:text-center ">
          Sign in to get into your employee dashboard
        </p>
        <SignInForm />
      </div>
    </div>
  );
};

export default SignInRight;
