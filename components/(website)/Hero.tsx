import React from "react";
import HeroAnimation from "./HeroAnimation";
import Button from "./Button";
const Hero = () => {
  return (
    <section className="relative flex h-screen max-md:gap-12 max-md:h-fit  max-md:flex-col max-md:p-6 max-md:pt-24 p-14   bg-dark-bg  text-white justify-between">
      <div className="blur absolute z-[0] w-[40%] h-[30%] top-[40%] -left-[3%]  rounded-[50%] opacity-80 bg-shining-gradient" />
      <div className="flex flex-col justify-center z-[1]">
        <h1 className="text-xl xs:text-3xl md:text-6xl font-bold capitalize">
          Manage Your <br /> Telegram Community <br /> With Ease
        </h1>
        <p className="text-base xs:text-lg md:text-xl text-muted-text mt-2 max-w-[600px]">
          Payments and membership management for Forex Telegram community owners
        </p>
        <Button text="Get Started" />
      </div>
      <HeroAnimation />
    </section>
  );
};

export default Hero;
