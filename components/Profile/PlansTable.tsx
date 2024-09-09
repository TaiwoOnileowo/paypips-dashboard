import React from "react";
import { plans } from "@/lib/data";
import search from "@/assets/icons/search.svg";
import Image from "next/image";

const PlansTable = () => {
  return (
    <div
      className="rounded-3xl w-full p-5 "
      style={{
        background:
          "linear-gradient(127deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(10, 14, 35, 0.71) 91.2%)",
      }}
    >
      <div className="flex max-md:flex-col justify-between items-center">
        <h2 className="text-white text-lg font-medium">My Plans</h2>
        <div className="flex gap-3 items-center text-white max-md:pt-3">
          <div className="flex items-center gap-2 rounded-xl border border-lightGray bg-[#0F1535] pl-2">
            <Image src={search} alt="search" width={20} height={20} />
            <input
              type="text"
              className=" px-3 p-2 bg-[#0F1535] rounded-r-xl text-sm text-white ring-0 transition-all  ease-in  outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search..."
            />
          </div>
        </div>
      </div>
      <div className="max-md:mt-2 mt-5 w-full text-white overflow-auto">
        <table className="w-full table-auto ">
          <thead className="">
            <tr className=" text-left max-md:text-sm">
              <th className=" text-left">Plan Name</th>
              <th className=" text-left">Payment Model</th>
              <th className=" text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((item, index) => {
              return (
                <tr
                  key={index}
                  className="font-medium border-t p-4 border-[#56577A]/50 "
                >
                  <td className=" text-left font-medium max-md:text-sm">
                    {item.name}
                  </td>
                  <td className=" text-left text-sm font-medium max-md:text-xs">
                    {item.paymentModel}
                  </td>
                  <td className=" text-left text-sm max-md:text-xs">
                    {item.amount}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlansTable;
