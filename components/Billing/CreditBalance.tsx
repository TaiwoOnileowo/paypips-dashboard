import React from "react";

import Image from "next/image";
import graph from "@/assets/icons/graph.svg";
import more from "@/assets/icons/more.svg";
import domain from "@/assets/icons/domain.svg";
const CreditBalance = () => {
  return (
    <div
      className="col-span-1 p-6 rounded-3xl h-60 backdrop-blur-[60px]"
      style={{
        background:
          "linear-gradient(127deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)",
      }}
    >
      <div
        className="rounded-3xl h-[100px] w-full flex justify-between items-center"
        style={{
          background:
            "linear-gradient(127deg, rgba(34, 41, 78, 0.94) -4.23%, rgba(10, 14, 35, 0.49) 76.75%)",
        }}
      >
        <div className="px-4 ">
          <p className="text-sm font-medium mb-0.5">Total balance</p>
          <h1 className="text-4xl font-bold">$25,345</h1>
        </div>
        <div className="h-full rounded-3xl relative p-3 py-2 flex justify-end bg-shadow bg-cover bg-no-repeat w-[140px]">
          <Image src={more} alt="more" className="w-6 h-6 cursor-pointer" />
          <Image
            src={graph}
            alt="graph"
            className="absolute right-4 top-[50%] translate-y-[-50%] transform"
          />
        </div>
      </div>
      <p className="text-xs mt-4 text-gray-400 font-medium ">NEWEST</p>
      <div className="flex justify-between gap-2 mt-2 items-center w-full ">
        <div className="w-[15%]">
          <div className="w-10 h-10 flex justify-center items-center rounded-full bg-ico_bg">
            <Image src={domain} alt="domain" className="w-6 h-6" />
          </div>
        </div>
        <div className="flex justify-between items-center w-[85%]">
          <div>
            <h3 className="text-sm font-medium">Payout to 3xx33x456</h3>
            <p className="text-sm text-gray-400 mt-0.5">Today, 16:36</p>
          </div>
          <p className=" font-bold">-$154.6</p>
        </div>
      </div>
    </div>
  );
};

export default CreditBalance;
