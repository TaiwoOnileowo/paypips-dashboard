"use client";
import React, { useState } from "react";
import Heading from "./Heading";
import FeaturesList from "./FeaturesList";
import { FaChevronDown } from "react-icons/fa";

import MoreFeatures from "./MoreFeatures";
import Button from "./Button";
const Features = () => {
  const [visible, setVisible] = useState(false);
  const [showMoreFeatures, setShowMoreFeatures] = useState(false);

  return (
    <section
      id="features"
      className="relative bg-dark-bg flex pt-16 flex-col items-center justify-center text-white"
    >
      <svg
        viewBox="0 0 1440 137"
        className="hidden md:block absolute -top-[8%]"
      >
        <path
          d="M0 137H1440V114.609H346.775C331.995 114.609 318.039 107.799 308.943 96.1501L248.278 18.4586C239.181 6.8092 225.225 0 210.445 0H0V137Z"
          fill="#14181f"
        ></path>
      </svg>
      <div className="blur absolute z-[0] w-[60%]  h-[60%] right-[-50%] top-[-35%] rounded-[50%] opacity-40 bg-shining-gradient" />
      <Heading text="Features" />
      <div className="flex mt-16 md:mt-24 gap-16 w-full  xs:px-8 md:px-24">
        <div className="w-[40%] hidden md:flex justify-center flex-col">
          <h3 className="uppercase text-blue-accent py-2">Our Hallmarks</h3>
          <h1 className="text-5xl font-bold py-4">
            The blocks of a powerful platform
          </h1>
          <p className="text-muted-text w-[500px]">
            Paypips is here to enhance and streamline the management of your
            Telegram community. From secure payment integrations to advanced
            member management tools, we provide everything you need to
            effectively engage and grow your community.
          </p>
          <Button text="Start For Free" />
        </div>
        <FeaturesList visible={visible} setVisible={setVisible} />
      </div>

      {showMoreFeatures ? (
        <MoreFeatures setShowMoreFeatures={setShowMoreFeatures} />
      ) : (
        <div
          className="my-8 py-4 xs:py-8 background-transition1 w-full cursor-pointer flex items-center justify-center"
          onClick={() => setShowMoreFeatures(true)}
        >
          <h2 className="text-base xs:text-2xl inline-flex fade-in-text cursor-pointer z-[1] items-center gap-2 ">
            View More Features <FaChevronDown />
          </h2>
        </div>
      )}
    </section>
  );
};

export default Features;
