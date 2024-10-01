"use client";
import React from "react";
import { MdError } from "react-icons/md";
import search from "@/assets/icons/search.svg";
import Image from "next/image";
import { Session } from "next-auth";
import errorGif from "@/assets/icons/error.gif";
import { useGetRecentPayouts } from "@/hooks/reactQueryHooks";
import { Skeleton } from "@/components/ui/skeleton";
import dollar from "@/assets/icons/dollar1.gif";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import Error from "./Error";
import NotFound from "./NotFound";
const PayoutsTable = ({ session }: { session: Session }) => {
  const {
    data: payouts,
    isLoading,
    isError,
    error,
  } = useGetRecentPayouts(session);

  if (isLoading) {
    return (
      <div
        className="rounded-3xl w-full p-5"
        style={{
          background:
            "linear-gradient(127deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(10, 14, 35, 0.71) 91.2%)",
        }}
      >
        <div className="flex max-md:flex-col justify-between items-center">
          <h2 className="text-white text-lg font-medium">Withdrawals</h2>
          <div className="flex gap-3 items-center text-white max-md:pt-3">
            <div className="flex items-center gap-2 rounded-xl border border-lightGray bg-[#0F1535] pl-2">
              <Image src={search} alt="search" width={20} height={20} />
              <input
                type="text"
                className="px-3 p-2 bg-[#0F1535] rounded-r-xl text-sm text-white ring-0 transition-all ease-in outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search..."
              />
            </div>
            <FilterListRoundedIcon className="cursor-pointer text-white" />
          </div>
        </div>
        <div className="max-md:mt-2 mt-5 w-full text-white overflow-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className=" text-left max-md:text-sm">
                <th className=" text-left">Amount</th>
                <th className=" text-left">Currency</th>
                <th className=" text-left">Status</th>
                <th className=" text-left">Date</th>
                <th className=" text-left">Time</th>
                <th className=" text-left">Beneficiary</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, index) => (
                <tr
                  key={index}
                  className="font-medium border-t p-4 border-[#56577A]/50"
                >
                  <td className="text-left">
                    <Skeleton className="h-4 w-52" />
                  </td>
                  <td className="text-left">
                    <Skeleton className="h-4 w-20" />
                  </td>
                  <td className="text-left">
                    <Skeleton className="h-4 w-20" />
                  </td>
                  <td className="text-left">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  <td className="text-left">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  <td className="text-left">
                    <Skeleton className="h-4 w-24" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  if (isError) {
    console.log(error, "error");
    return (
      <div
        className="rounded-3xl w-full p-5 pb-10"
        style={{
          background:
            "linear-gradient(127deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(10, 14, 35, 0.71) 91.2%)",
        }}
      >
        <div className="flex max-md:flex-col justify-between items-center">
          <h2 className="text-white text-lg font-medium">Withdrawals</h2>
          <div className="flex gap-3 items-center text-white max-md:pt-3">
            <div className="flex items-center gap-2 rounded-xl border border-lightGray bg-[#0F1535] pl-2">
              <Image src={search} alt="search" width={20} height={20} />
              <input
                type="text"
                className="px-3 p-2 bg-[#0F1535] rounded-r-xl text-sm text-white ring-0 transition-all ease-in outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search..."
              />
            </div>
            <FilterListRoundedIcon className="cursor-pointer text-white" />
          </div>
        </div>
        <table className="w-full table-auto ">
          <thead className="">
            <tr className=" text-left max-md:text-sm">
              <th className=" text-left">Amount</th>
              <th className=" text-left">Currency</th>
              <th className=" text-left">Status</th>
              <th className=" text-left">Date</th>
              <th className=" text-left">Time</th>
              <th className=" text-left">Beneficiary</th>
            </tr>
          </thead>
        </table>
        <Error message="An error occurred while fetching payouts" />
      </div>
    );
  }
  if (!payouts) return null;
  return (
    <div
      className="rounded-3xl w-full p-5 "
      style={{
        background:
          "linear-gradient(127deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(10, 14, 35, 0.71) 91.2%)",
      }}
    >
      <div className="flex max-md:flex-col justify-between items-center">
        <h2 className="text-white text-lg font-medium">Withdrawals</h2>
        <div className="max-md:pt-3 flex gap-3 items-center text-white">
          <div className="flex items-center gap-2 rounded-xl border border-lightGray bg-[#0F1535] pl-2">
            <Image src={search} alt="search" width={20} height={20} />
            <input
              type="text"
              className=" px-3 p-2 bg-[#0F1535] rounded-r-xl text-sm text-white ring-0 transition-all  ease-in  outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search..."
            />
          </div>
          <FilterListRoundedIcon className="cursor-pointer text-white" />
        </div>
      </div>
      <div className="mt-5 overflow-auto max-md:mt-2 w-full text-white">
        {payouts.length > 0 ? (
          <table className="w-full table-auto ">
            <thead className="">
              <tr className=" text-left max-md:text-sm">
                <th className=" text-left">Amount</th>
                <th className=" text-left">Currency</th>
                <th className=" text-left">Status</th>
                <th className=" text-left">Date</th>
                <th className=" text-left">Time</th>
                <th className=" text-left">Beneficiary</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="font-medium border-t p-4 border-[#56577A]/50 "
                  >
                    <td className=" text-left text-sm max-md:text-xs">
                      {item.amount}
                    </td>
                    <td className=" text-left text-sm font-medium max-md:text-xs">
                      {item.currency}
                    </td>

                    <td className={`text-left text-xs `}>
                      <span
                        className={`w-[80px] p-1 capitalize rounded-md items-center flex justify-center ${
                          item.status === "pending"
                            ? "border"
                            : item.status === "failed"
                            ? "bg-red-500"
                            : "bg-green-500"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className=" text-left text-sm max-md:text-xs">
                      {item.date}
                    </td>
                    <td className=" text-left text-sm max-md:text-xs">
                      {item.time}
                    </td>
                    <td className=" text-left font-medium max-md:text-sm">
                      {item.beneficiary}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div>
            <table className="w-full table-auto">
              <thead>
                <tr className="text-left max-md:text-sm">
                  <th className="text-left">Email</th>
                  <th className="text-left">Plan</th>
                  <th className="text-left">Amount</th>
                  <th className="text-left">Method</th>
                  <th className="text-left">Date</th>
                </tr>
              </thead>
            </table>
            <NotFound message="No payouts yet" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PayoutsTable;
