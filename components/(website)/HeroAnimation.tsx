import React from "react";

import { BsCreditCard2BackFill } from "react-icons/bs";
import { FaBitcoinSign } from "react-icons/fa6";
import paystack from "@/assets/images/paystack.svg";
import logo from "@/assets/images/logo.png";

import Image from "next/image";
import HeroAnimationSide from "../HeroAnimationSide";

const HeroAnimation = () => {
  return (
    <div className=" flex  items-center justify-center z-50">
      <HeroAnimationSide />
      <hr className="w-[20px] xs:w-[40px] z-[1] border-2 border-muted-text" />
      <div className="bg-primary-purple z-[10] h-[260px] xs:h-[350px] xsm:h-[420px] lg:h-[500px] flex flex-col items-center gap-1 xsm:gap-4 p-4 w-[60px] xs:w-[85px] lg:w-[120px] border-hero-animation">
        <div className="w-[40px] xs:w-[60px] h-[40px] xs:h-[60px] bg-white flex items-center rounded-full p-2 text-[25px] xs:xs:p-4">
          <Image src={logo} alt="" />
        </div>
        <div className="flex flex-col gap-2 xs:gap-4 mt-4">
          <div
            className={` bg-white z-10 text-blue-accent items-center justify-center p-[8px] xs:p-[12px] lg:w-20 lg:h-20  w-10 xs:w-14 h-10 xs:h-14 rounded-full`}
          >
            <BsCreditCard2BackFill className="text-[25px] xs:text-[35px] lg:text-[55px] " />
          </div>
          <div
            className={` bg-white z-10 text-primary-purple items-center justify-center p-[8px] xs:p-[12px] lg:w-20 lg:h-20  w-10 xs:w-14 h-10 xs:h-14  rounded-full`}
          >
            <FaBitcoinSign className="text-[25px] xs:text-[35px] lg:text-[55px] " />
          </div>
          <div className={`bg-white z-10 text-black xs:p-4 p-2 rounded-full `}>
            <Image
              src={paystack}
              alt=""
              className="lg:w-12 lg:h-12  w-6 xs:w-8 h-6 xs:h-6"
            />
          </div>
        </div>
        <h3 className="text-white text-sm xs:text-lg">$13000</h3>
      </div>
      <hr className="w-[20px] xs:w-[40px] border-2 border-muted-text" />
      <HeroAnimationSide />
    </div>
  );
};

export default HeroAnimation;
