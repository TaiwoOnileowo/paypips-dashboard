import React from "react";
import Heading from "./Heading";
import FeatureStrollAnimation from "./FeatureStrollAnimation";
import Button from "./Button";

const FeatureStroll = () => {
  return (
    <div
      id="feature-stroll"
      className="relative bg-dark-bg flex  px-2 xs:px-6 msm:px-12 pb-16 xsm:pb-36 pt-16 flex-col items-center justify-center text-white"
    >
      <svg
        viewBox="0 0 1440 137"
        className="hidden md:block absolute -top-[12%]"
      >
        <path
          d="M0 137H1440V114.609H346.775C331.995 114.609 318.039 107.799 308.943 96.1501L248.278 18.4586C239.181 6.8092 225.225 0 210.445 0H0V137Z"
          fill="#14181f"
        ></path>
      </svg>
      <div className="blur absolute z-[0] w-[60%]  h-[60%] right-[-50%] top-[-35%] rounded-[50%] opacity-40 bg-shining-gradient" />
      <Heading text="Feature Walkthrough" />
      <div className="flex xsm:flex-row flex-col gap-16 md:gap-32 xsm:mt-24">
        <div className="xsm:w-[50%]  flex justify-center flex-col ">
          <h3 className="uppercase text-blue-accent py-2  text-sm md:text-base hidden md:block">
            Feature Stroll
          </h3>
          <h1 className="text-xl xs:text-4xl md:text-5xl font-bold py-4">
            Discover Paypips in Action
          </h1>
          <p className="text-muted-text text-sm md:text-base">
            Explore even more functionalities of Paypips. From sending invite
            links and broadcasting messages to supporting subscribers and
            analyzing user insights, experience the power of our platform
            firsthand.
          </p>
          <Button text="Get Started" />
        </div>
        <div className="md:w-[50%]">
          <FeatureStrollAnimation />
        </div>
      </div>
    </div>
  );
};

export default FeatureStroll;
