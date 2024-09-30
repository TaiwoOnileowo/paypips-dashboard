"use client";
import React from "react";
import smilyface from "@/assets/icons/smilyface.svg";
import Image from "next/image";
import { useGetRevenueStats } from "@/hooks/reactQueryHooks";

import { Session } from "next-auth";
const MonthlyRevenue = ({ session }: { session: Session }) => {
  const { data: revenueStats } = useGetRevenueStats(session);
  return (
    <div
      className="col-span-6 xl:col-span-3 max-xl:max-h-[350px] h-full rounded-3xl p-6 text-white basis-1/3"
      style={{
        background:
          "linear-gradient(127deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)",
      }}
    >
      <h2 className="font-bold  text-lg">This Month&apos;s Revenue</h2>
      <p className="text-gray-300/80 mt-1">From all plans</p>
      <div className="flex flex-col  items-center justify-between h-[200px] gap-2 mt-10 pb-4">
        <div className="rounded-full w-14 h-14 bg-sharpBlue flex items-center justify-center">
          <Image src={smilyface} alt="smilyface" width={30} height={30} />
        </div>
        <div
          className="flex w-full justify-center items-center rounded-3xl bg-black/30 p-4 text-xl font-bold text-white"
          style={{
            background:
              "linear-gradient(127deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(10, 14, 35, 0.71) 91.2%)",
            backdropFilter: "blur(60px)",
          }}
        >
          {revenueStats && revenueStats.monthRevenue
            ? `$${revenueStats.monthRevenue}`
            : "N/A"}
        </div>
      </div>
    </div>
  );
};

export default MonthlyRevenue;
