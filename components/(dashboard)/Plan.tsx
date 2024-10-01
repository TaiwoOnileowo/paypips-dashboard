"use client"
import React from "react";
import Image from "next/image";
import { Session } from "next-auth";
import slash from "@/assets/icons/slash1.svg";
import { useGetSubscriptionStats } from "@/hooks/reactQueryHooks";
import Error from "./Error";
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
      </div>
    );
  }
  if (isError) {
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
      {/* <p className="text-gray-400 mt-2 text-sm font-bold">{plan?.name}</p> */}
      <p className="text-gray-400  mt-1 ">
        Lower transaction fees, access codes, priority onboarding, custom
        broadcast messages, access to beta features and more
      </p>
      {/* BOLU-TODO */}
      <Image src={slash} alt="slash" className="my-6 w-full" />
    </div>
  );
};

export default Plan;
