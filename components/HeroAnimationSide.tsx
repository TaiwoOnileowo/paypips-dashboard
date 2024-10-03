import React from "react";
import avatar1 from "@/assets/images/avatar1.jpg";
import avatar2 from "@/assets/images/avatar2.jpg";
import avatar3 from "@/assets/images/avatar3.jpg";
import { MdOutlineMessage } from "react-icons/md";
import Image from "next/image";
const HeroAnimationSide = () => {
  return (
    <div className="w-[50px] xs:w-[80px] ss:w-[100px] md:w-[120px] lg:w-[180px] lg:h-[350px] h-[100px] xs:h-[200px] xsm:h-[234px] bg-blue-accent flex flex-col items-center justify-center rounded-[20px] xs:p-4">
      <div className="flex pb-2 xs:pb-8 gap-1">
        <div className="lg:w-12 lg:h-12 md:w-8 md:h-8 xs:w-4 xs:h-4 w-2 h-2 ss:h-6 ss:w-6 rounded-full bg-[#dde0ca]" />
        <div className="flex flex-col items-center justify-center gap-[2px] xs:gap-1 ss:gap-2">
          <div className="lg:w-[90px] w-[20px] xs:w-[35px] h-[2px] xs:h-1 ss:h-2 md:w-[50px] lg:h-4  rounded-[20px] bg-[#dde0ca]" />
          <div className="lg:w-[90px] w-[20px] xs:w-[35px] h-[2px] xs:h-1 ss:h-2 md:w-[50px] lg:h-4  rounded-[20px] bg-[#dde0ca]" />
        </div>
      </div>
      <MdOutlineMessage className="text-[40px] xs:text-[90px]  md:text-[125px] lg:text-[160px] text-[#dde0ca]" />
      <div className="flex mt-2 xs:mt-6 px-2 xs:px-0 xs:justify-start w-full">
        <Image
          src={avatar1}
          alt=""
          className="rounded-full  w-[12px] xs:w-8 h-[12px] xs:h-8  lg:w-10 lg:h-10 border-2 border-white"
        />
        <Image
          src={avatar3}
          alt=""
          className="rounded-full  w-[12px] xs:w-8 h-[12px] xs:h-8 lg:w-10 lg:h-10 -mx-[6px] xs:-mx-6 border-2 border-white"
        />
        <Image
          src={avatar2}
          alt=""
          className="rounded-full w-[12px] xs:w-8 h-[12px] xs:h-8  lg:w-10 lg:h-10 border-2 border-white "
        />
        <Image
          src={avatar1}
          alt=""
          className="rounded-full  w-[12px] xs:w-8 h-[12px] xs:h-8 lg:w-10 lg:h-10 -mx-[6px] xs:-mx-6 border-2 border-white"
        />
      </div>
    </div>
  );
};

export default HeroAnimationSide;
