import React from "react";
import { MdOutlineMessage } from "react-icons/md";
import { BiMessageDetail } from "react-icons/bi";

import { BsCreditCard2BackFill } from "react-icons/bs";
import { FaBitcoinSign } from "react-icons/fa6";
import paystack from "@/assets/images/paystack.svg";
import logo from "@/assets/images/logo.png";
import avatar1 from "@/assets/images/avatar1.jpg";
import avatar2 from "@/assets/images/avatar2.jpg";
import avatar3 from "@/assets/images/avatar3.jpg";
import Image from "next/image";

const HeroAnimation = () => {
  return (
    <div className=" flex  items-center justify-center">
      <div className="w-[50px] xs:w-[80px] ss:w-[100px] msm:w-[120px] md:w-[180px] md:h-[350px] h-[100px] xs:h-[200px] xsm:h-[234px] bg-blue-accent flex flex-col items-center justify-center rounded-[20px] xs:p-4">
        <div className="flex pb-2 xs:pb-8 gap-1">
          <div className="md:w-12 md:h-12 msm:w-8 msm:h-8 xs:w-4 xs:h-4 w-2 h-2 ss:h-6 ss:w-6 rounded-full bg-[#dde0ca]" />
          <div className="flex flex-col items-center justify-center gap-[2px] xs:gap-1 ss:gap-2">
            <div className="md:w-[90px] w-[20px] xs:w-[35px] h-[2px] xs:h-1 ss:h-2 msm:w-[50px] md:h-4  rounded-[20px] bg-[#dde0ca]" />
            <div className="md:w-[90px] w-[20px] xs:w-[35px] h-[2px] xs:h-1 ss:h-2 msm:w-[50px] md:h-4  rounded-[20px] bg-[#dde0ca]" />
          </div>
        </div>
        <MdOutlineMessage className="text-[40px] xs:text-[90px]  msm:text-[125px] md:text-[160px] text-[#dde0ca]" />
        <div className="flex mt-2 xs:mt-6 px-2 xs:px-0 xs:justify-start w-full">
          <Image
            src={avatar1}
            alt=""
            className="rounded-full  w-[12px] xs:w-8 h-[12px] xs:h-8  md:w-10 md:h-10 border-2 border-white"
          />
          <Image
            src={avatar3}
            alt=""
            className="rounded-full  w-[12px] xs:w-8 h-[12px] xs:h-8 md:w-10 md:h-10 -mx-[6px] xs:-mx-6 border-2 border-white"
          />
          <Image
            src={avatar2}
            alt=""
            className="rounded-full w-[12px] xs:w-8 h-[12px] xs:h-8  md:w-10 md:h-10 border-2 border-white "
          />
          <Image
            src={avatar1}
            alt=""
            className="rounded-full  w-[12px] xs:w-8 h-[12px] xs:h-8 md:w-10 md:h-10 -mx-[6px] xs:-mx-6 border-2 border-white"
          />
        </div>
      </div>
      <hr className="w-[20px] xs:w-[40px] z-[1] border-2 border-muted-text" />
      <div className="bg-primary-purple z-[10] h-[260px] xs:h-[350px] xsm:h-[420px] md:h-[500px] flex flex-col items-center gap-1 xsm:gap-4 p-4 w-[60px] xs:w-[85px] md:w-[120px] border-hero-animation">
        <div className="w-[40px] xs:w-[60px] h-[40px] xs:h-[60px] bg-white flex items-center rounded-full p-2 text-[25px] xs:xs:p-4">
          <Image src={logo} alt="" />
        </div>
        <div className="flex flex-col gap-2 xs:gap-4 mt-4">
          <div
            className={` bg-white z-10 text-blue-accent items-center justify-center p-[8px] xs:p-[12px] md:w-20 md:h-20  w-10 xs:w-14 h-10 xs:h-14 rounded-full`}
          >
            <BsCreditCard2BackFill className="text-[25px] xs:text-[35px] md:text-[55px] " />
          </div>
          <div
            className={` bg-white z-10 text-primary-purple items-center justify-center p-[8px] xs:p-[12px] md:w-20 md:h-20  w-10 xs:w-14 h-10 xs:h-14  rounded-full`}
          >
            <FaBitcoinSign className="text-[25px] xs:text-[35px] md:text-[55px] " />
          </div>
          <div className={`bg-white z-10 text-black xs:p-4 p-2 rounded-full `}>
            <Image
              src={paystack}
              alt=""
              className="md:w-12 md:h-12  w-6 xs:w-8 h-6 xs:h-6"
            />
          </div>
        </div>
        <h3 className="text-white text-sm xs:text-lg">$13000</h3>
      </div>
      <hr className="w-[20px] xs:w-[40px] border-2 border-muted-text" />
      <div className="w-[50px] xs:w-[80px] ss:w-[100px] msm:w-[120px] md:w-[180px] md:h-[350px] h-[100px] xs:h-[200px] xsm:h-[234px] bg-blue-accent flex flex-col items-center justify-center rounded-[20px] xs:p-4">
        <div className="flex pb-2 xs:pb-8 gap-1">
          <div className="md:w-12 md:h-12 msm:w-8 msm:h-8 xs:w-4 xs:h-4 w-2 h-2 ss:h-6 ss:w-6 rounded-full bg-[#dde0ca]" />
          <div className="flex flex-col items-center justify-center gap-[2px] xs:gap-1 ss:gap-2">
            <div className="md:w-[90px] w-[20px] xs:w-[35px] h-[2px] xs:h-1 ss:h-2 msm:w-[50px] md:h-4  rounded-[20px] bg-[#dde0ca]" />
            <div className="md:w-[90px] w-[20px] xs:w-[35px] h-[2px] xs:h-1 ss:h-2 msm:w-[50px] md:h-4  rounded-[20px] bg-[#dde0ca]" />
          </div>
        </div>
        <BiMessageDetail className="text-[40px] xs:text-[90px]  msm:text-[125px] md:text-[160px] text-[#dde0ca]" />
        <div className="flex mt-2 xs:mt-6 px-2 xs:px-0 xs:justify-start w-full">
          <Image
            src={avatar1}
            alt=""
            className="rounded-full  w-[12px] xs:w-8 h-[12px] xs:h-8  md:w-10 md:h-10 border-2 border-white"
          />
          <Image
            src={avatar3}
            alt=""
            className="rounded-full  w-[12px] xs:w-8 h-[12px] xs:h-8 md:w-10 md:h-10 -mx-[6px] xs:-mx-6 border-2 border-white"
          />
          <Image
            src={avatar2}
            alt=""
            className="rounded-full w-[12px] xs:w-8 h-[12px] xs:h-8  md:w-10 md:h-10 border-2 border-white "
          />
          <Image
            src={avatar1}
            alt=""
            className="rounded-full  w-[12px] xs:w-8 h-[12px] xs:h-8 md:w-10 md:h-10 -mx-[6px] xs:-mx-6 border-2 border-white"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroAnimation;
