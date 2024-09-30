"use client";
import React, { useState } from "react";
import Image from "next/image";
import { homePageStats } from "@/lib/data";

import { Session } from "next-auth";
import { useGetStats } from "@/hooks/reactQueryHooks";

import { IoEyeOffOutline } from "react-icons/io5";

import { MdOutlineRemoveRedEye } from "react-icons/md";

const HomePageStats = ({ session }: { session: Session }) => {
  if (typeof window === "undefined") return null;
  const { data: stats } = useGetStats(session);
  const [hideAmount, setHideAmount] = useState(
    localStorage.getItem("hide-amount") === "true" || false
  );

  const handleHideAmount = () => {
    setHideAmount(!hideAmount);
  };
  let updatedHomePageStats = homePageStats;
  if (stats) {
    updatedHomePageStats = homePageStats.map((stat) => {
      switch (stat.sub) {
        case "Today's revenue":
          return {
            ...stat,
            value: stats.amountstats?.todayAmount,
            percent: stats.amountstats?.todayAmountPercentageIncrease,
          };
        case "Today's subscription":
          return {
            ...stat,
            value: stats.subscriptionstats?.todaySubscriptions,
            percent:
              stats.subscriptionstats?.todaySubscriptionPercentageIncrease,
          };
        case "Active subscription":
          return {
            ...stat,
            value: stats.subscriptionstats?.activeSubscriptions,
            percent:
              stats.subscriptionstats?.activeSubscriptionPercentageIncrease,
          };
        case "Total revenue":
          return {
            ...stat,
            value: stats.amountstats?.totalAmount,
            percent: stats.amountstats?.totalAmountPercentageIncrease,
          };
        default:
          return stat;
      }
    });
  }
  // console.log(updatedHomePageStats);
  return (
    <div className="w-full grid grid-cols-2 xl:grid-cols-4 max-md:flex-col max-md:flex gap-5 items-center  max-md:mt-6">
      {updatedHomePageStats.map((item, index) => {
        let negativeIncrease = false;
        if (item.percent) {
          negativeIncrease =
            typeof item.percent === "string" &&
            (item.percent as string).includes("-");
        }
        const isSubscription =
          item.sub === "Active subscription" ||
          item.sub === "Today's subscription";
        const isTotalSales = item.sub === "Total revenue";
        return (
          <div
            key={index}
            className="flex items-center gap-4 p-5 w-full  justify-between rounded-3xl"
            style={{
              background:
                "linear-gradient(127deg, rgba(6, 11, 38, 0.74) 28.26%, rgba(26, 31, 55, 0.50) 91.2%)",
            }}
          >
            <div>
              <p className="text-white font-plus text-xs mb-1 flex items-center gap-2 ">
                {item.sub}
                {isTotalSales && (
                  <span>
                    {hideAmount ? (
                      <IoEyeOffOutline onClick={handleHideAmount} />
                    ) : (
                      <MdOutlineRemoveRedEye onClick={handleHideAmount} />
                    )}
                  </span>
                )}
              </p>
              <div className="flex items-center gap-2">
                {item.percent == "" ? (
                  <p className="text-white font-plus text-xl font-bold">N/A</p>
                ) : (
                  <>
                    <p className="text-white font-plus text-xl font-bold">
                      {!isSubscription && !isTotalSales ? "$" : ""}
                      {isTotalSales
                        ? hideAmount
                          ? "XXXX"
                          : `$${item.value}`
                        : item.value}
                    </p>

                    <p
                      className={`text-sm font-bold ${
                        !negativeIncrease ? "text-[#01B574]" : "text-[#E31A1A]"
                      }`}
                    >
                      {`${!negativeIncrease ? "+" : ""}${item.percent}
                      %`}
                    </p>
                  </>
                )}
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
