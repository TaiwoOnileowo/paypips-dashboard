import React from "react";

import DateRangeRoundedIcon from "@mui/icons-material/DateRangeRounded";
import Transactions from "../Transactions";
const RecentTransactions = () => {
  return (
    <div
      className="col-span-4 text-white p-6 min-h-[520px] rounded-3xl backdrop-blur-[60px] bg-cover bg-no-repeat bg-center bg-paymethod_bg"
      style={{
        background:
          "linear-gradient(127deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)",
      }}
    >
      <div className="flex max-md:flex-col justify-between w-full items-center">
        <h3 className="font-medium text-lg">Your Transactions</h3>
        <div className="flex gap-2 text-sm items-center justify-center">
          <DateRangeRoundedIcon className="text-base" />
          <p className="text-gray-400 ">04-07 September 2024</p>
        </div>
      </div>
      <Transactions name="Newest" showRecent={true} />
      <Transactions name="Yesterday" showRecent={false} />
    </div>
  );
};

export default RecentTransactions;
