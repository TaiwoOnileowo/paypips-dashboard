import React from "react";
import Heading from "./Heading";
import FeatureStrollAnimation from "./FeatureStrollAnimation";
import Button from "./Button";

const FeatureStroll = () => {
  return (
    <div
      id="feature-stroll"
      className="relative bg-dark-bg flex p-12 flex-col items-center justify-center text-white"
    >
      <div className="blur absolute z-[0] w-[60%]  h-[60%] right-[-50%] top-[-35%] rounded-[50%] opacity-40 bg-shining-gradient" />
      <Heading text="Feature Walkthrough" />
      <div className="flex max-lg:flex-col gap-16 md:gap-32 mt-8">
        <div className="w-full xl:w-[50%]  flex justify-center flex-col ">
          <h3 className="uppercase text-blue-accent py-2  text-sm md:text-base hidden md:block">
            Feature Stroll
          </h3>
          <h1 className="text-xl xs:text-4xl md:text-5xl font-bold py-4">
            Discover Paypips <br /> in Action
          </h1>
          <p className="text-muted-text text-sm md:text-base max-w-xl">
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
