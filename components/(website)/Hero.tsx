import React from "react";
import HeroAnimation from "./HeroAnimation";
import Button from "./Button";
const Hero = () => {
  return (
    <section className="relative flex xsm:flex-row flex-col bg-dark-bg px-8 msm:px-16 text-white xsm:pt-0 pt-32 md:h-[120%]  xsm:h-[70vh] items-center justify-center gap-12 xsm:gap-8 msm:gap-10 md:gap-16">
      <div className="blur absolute z-[0] w-[40%] animate-pulse h-[30%] top-[40%] -left-[3%]  rounded-[50%] opacity-80 bg-shining-gradient" />
      <div className="flex flex-col justify-center z-[1]">
        <h3 className="uppercase text-blue-accent text-sm md:text-base py-2">
          Paypips
        </h3>
        <h1 className="text-xl xs:text-3xl md:text-4xl font-bold pop-up">
          Manage Your Telegram Forex Community with Ease
        </h1>
        <p className="text-base xs:text-lg md:text-xl italic fade-in text-muted-text mt-2">
          PayPips provides powerful tools for Telegram community owners to
          streamline management and maximize engagement.
        </p>
        <Button text="Get Started" />
      </div>
      <HeroAnimation />
    </section>
  );
};

export default Hero;
