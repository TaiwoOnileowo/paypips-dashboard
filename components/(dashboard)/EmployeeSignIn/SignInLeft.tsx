import React from "react";

const SignInLeft = () => {
  return (
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
  );
};

export default SignInLeft;
