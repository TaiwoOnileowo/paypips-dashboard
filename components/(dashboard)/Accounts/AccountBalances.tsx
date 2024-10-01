"use client";
import React from "react";
import { useGetAccountDetails } from "@/hooks/reactQueryHooks";
import { Session } from "next-auth";
import { Skeleton } from "@/components/ui/skeleton";
import Error from "../Error";
const AccountBalances = ({ session }: { session: Session }) => {
  const {
    data: account,
    isLoading,
    isError,
    error,
  } = useGetAccountDetails(session);

  if (isLoading) {
    return (
      <div
        className="col-span-1 text-white p-6 h-[240px] rounded-3xl backdrop-blur-[60px] bg-cover bg-no-repeat bg-center bg-paymethod_bg"
        style={{
          background:
            "linear-gradient(127deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)",
        }}
      >
        <h3 className="font-medium text-lg">Account Balances</h3>
        <div className="w-full flex flex-col items-center justify-center mt-3 gap-2">
          {[1, 2, 3, 4].map((_, idx) => (
            <div
              key={idx}
              className="flex w-full mt-3  gap-3 items-center justify-between "
            >
              <Skeleton className="w-40 h-4" />
              <Skeleton className="w-14 h-4" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  console.log(isLoading, "Isloading", isError);
  if (isError || !account) {
    console.log(error);
    return (
      <div
        className="col-span-1 text-white p-6 h-[240px] rounded-3xl backdrop-blur-[60px] bg-cover bg-no-repeat bg-center bg-paymethod_bg"
        style={{
          background:
            "linear-gradient(127deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)",
        }}
      >
        <h3 className="font-medium text-lg">Account Balances</h3>
        <Error message="An error occurred" />
      </div>
    );
  }
  const balances = account.balances;
  return (
    <div
      className="col-span-1 text-white p-6 h-[240px] rounded-3xl backdrop-blur-[60px] bg-cover bg-no-repeat bg-center bg-paymethod_bg"
      style={{
        background:
          "linear-gradient(127deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)",
      }}
    >
      <h3 className="font-medium text-lg">Account Balances</h3>
      <div className="w-full flex flex-col items-center justify-center mt-3">
        {balances.map((balance, index) => (
          <div
            key={index}
            className="flex w-full mt-3  gap-3 items-center justify-between "
          >
            <h3 className="">{balance.name}</h3>
            <p className="text-gray-400">{balance.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountBalances;
