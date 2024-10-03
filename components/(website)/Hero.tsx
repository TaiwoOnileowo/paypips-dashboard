import React from "react";
import HeroAnimation from "./HeroAnimation";
import Button from "./Button";
const Hero = () => {
  return (
    <section className="relative flex xl:h-screen max-xl:gap-12 lg:h-[80vh] max-lg:h-fit  max-xl:flex-col max-xl:items-center max-xl:p-6 max-xl:pt-24 justify-center bg-dark-bg  text-white xl:gap-48">
      <div className="blur absolute z-[0] w-[40%] h-[30%] top-[40%] -left-[3%]  rounded-[50%] opacity-80 bg-shining-gradient" />
      <div className="flex flex-col justify-center z-[1] max-xl:items-center">
        <h1 className="text-xl xs:text-3xl md:text-6xl font-bold capitalize max-xl:text-center">
          Transform Your <br /> Forex Telegram
        </h1>
        <p className="text-base xs:text-lg md:text-xl text-muted-text mt-2 max-w-[600px] max-xl:text-center font-lato">
          Easy Payments, Seamless Management with Paypips!
        </p>
        <Button text="Get Started" />
      </div>
      <HeroAnimation />
    </section>
  );
};

export default Hero;
