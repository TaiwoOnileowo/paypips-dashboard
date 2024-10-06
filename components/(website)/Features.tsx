"use client";
import React, { useState } from "react";
import Heading from "./Heading";
import FeaturesList from "./FeaturesList";
import { FaChevronDown } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import MoreFeatures from "./MoreFeatures";
import Button from "./Button";
import Link from "next/link";
const Features = () => {
  const [showMoreFeatures, setShowMoreFeatures] = useState(false);
  const toggleShowMoreFeatures = () => {
    setShowMoreFeatures(!showMoreFeatures);
  };
  return (
    <section
      id="features"
      className="relative bg-dark-bg flex pt-10 flex-col items-center justify-center text-white"
    >
      <div className="blur absolute z-[0] w-[60%]  h-[60%] right-[-50%] top-[-35%] rounded-[50%] opacity-40 bg-shining-gradient" />
      <Heading text="Features" />
      <div className="flex max-xl:flex-col mt-16 gap-16 w-full  xs:px-10 xl:px-24">
        <div className=" flex justify-center flex-col w-[50%] max-xl:hidden max-xl:w-full">
          <h3 className="uppercase text-blue-accent py-2">Our Hallmarks</h3>
          <h1 className="text-5xl font-bold py-4">
            The blocks of a <br />
            powerful platform
          </h1>
          <p className="text-muted-text w-[500px]">
            With Paypips, managing your Forex Telegram community becomes easy.
            From secure payment integrations to advanced member management
            tools, we want you to focus on the Forex and while manage the
            community.
          </p>
          <Link href="#pricing">
            <Button text="Start For Free" />
          </Link>
        </div>
        <FeaturesList />
      </div>

      {showMoreFeatures && (
        <MoreFeatures setShowMoreFeatures={setShowMoreFeatures} />
      )}
      <div
        className="my-8 py-4 xs:py-8 background-transition1 w-full cursor-pointer flex items-center justify-center"
        onClick={toggleShowMoreFeatures}
      >
        <h2 className=" inline-flex fade-in-text cursor-pointer z-[1] items-center gap-2 ">
          View {showMoreFeatures ? "Less" : "More"} Features
          {showMoreFeatures ? <IoIosArrowUp /> : <FaChevronDown />}
        </h2>
      </div>
    </section>
  );
};

export default Features;
