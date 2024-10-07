"use client";
import React from "react";
import Image from "next/image";
import { Session } from "next-auth";
import slash from "@/assets/icons/slash1.svg";
import { pricing } from "@/lib/data/websitedata";
import { useGetSubscriptionStats } from "@/hooks/reactQueryHooks";
import Error from "./Error";
import { Skeleton } from "@mui/material";
import Pricing from "./Pricing";
const Plan = ({ session }: { session: Session }) => {
  const { data, isLoading, isError, error } = useGetSubscriptionStats(session);

  if (isLoading) {
    return (
      <div
        className="max-[1300px]:col-span-12 max-md:text-sm h-[370px] col-span-6 p-6 rounded-3xl text-[15px]"
        style={{
          background:
            "linear-gradient(127deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)",
        }}
      >
        <h1 className="text-lg font-bold">Plan</h1>
        <Skeleton className="h-6 w-[300px] bg-gray-400" />
        <Skeleton className="w-full h-10 bg-gray-400" />
      </div>
    );
  }
  if (isError) {
    console.log(error, "error");
    return (
      <div
        className="max-[1300px]:col-span-12 max-md:text-sm h-[370px] col-span-6 p-6 rounded-3xl text-[15px]"
        style={{
          background:
            "linear-gradient(127deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)",
        }}
      >
        <h1 className="text-lg font-bold">Plan</h1>
        <Error message="An error occured" />
      </div>
    );
  }
  const plan = data?.subscriptionPlan;
  const getPlanText = (plan: string) => {
    if (plan.includes("Professional")) {
      return "Lower transaction fees, access codes, priority onboarding, custom broadcast messages, access to beta features and more";
    } else if (plan.includes("Basic")) {
      return "Recieve payments through multiple methods, invite links, email support, access to dashboard and more";
    } else if (plan.includes("Growth")) {
      return "Automated group management, automated renewal reminders, dashboard analytics and more";
    }
    return "";
  };
  const pricingIndex = pricing.findIndex((price) => price.name === plan?.name);

  return (
    <div
      className="max-[1300px]:col-span-12 max-md:text-sm h-[370px] col-span-6 p-6 rounded-3xl text-[15px]"
      style={{
        background:
          "linear-gradient(127deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)",
      }}
    >
      <h1 className="text-lg font-bold">Plan</h1>
      <h1 className="text-gray-400 mt-2 font-bold">{plan?.name}</h1>
      <p className="text-gray-400 mt-1 font-bold flex items-center ">
        Status: <span className="text-white ml-2">{plan?.status}</span>{" "}
        {plan?.status === "Active" && (
          <span className="w-1 h-1 ml-2 inline-flex rounded-full animate-ping bg-green-500"></span>
        )}
      </p>
      {plan?.status !== "Pending" && (
        <p className="text-gray-400  mt-1 ">{getPlanText(plan?.name || "")}</p>
      )}

      <Image src={slash} alt="slash" className="my-4 w-full" />
      <div className="flex flex-col items-center">
        <h1 className=" text-lg">Your subscription is pending</h1>
        <Pricing index={pricingIndex} />
      </div>
    </div>
  );
};

export default Plan;
