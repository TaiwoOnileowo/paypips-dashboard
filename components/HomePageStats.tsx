import React from "react";
import Image from "next/image";
import { homePageStats } from "@/lib/data";
const HomePageStats = () => {
  return (
    <div className="w-full grid grid-cols-2 xl:grid-cols-4 max-md:flex-col max-md:flex gap-5 items-center  max-md:mt-6">
      {homePageStats.map((item, index) => {
        return (
          <div
            key={index}
            className="flex items-center gap-4 p-5 w-full  justify-between rounded-2xl"
            style={{
              background:
                "linear-gradient(127deg, rgba(6, 11, 38, 0.74) 28.26%, rgba(26, 31, 55, 0.50) 91.2%)",
            }}
          >
            <div>
              <p className="text-white font-plus text-xs mb-1 font-plus">
                {item.sub}
              </p>
              <div className="flex items-center gap-2">
                <p className="text-white font-plus text-xl font-bold">
                  {item.value}
                </p>
                <p
                  className={`${
                    item.percent.includes("-")
                      ? "text-[#E31A1A]"
                      : "text-[#01B574]"
                  } font-plus text-sm font-bold`}
                >
                  {item.percent}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-sharpBlue rounded-xl w-12 h-12 justify-center p-1">
              <Image src={item.icon} alt="" width={25} height={25} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HomePageStats;
