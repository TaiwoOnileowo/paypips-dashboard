"use client";
import React, { forwardRef } from "react";
import Search from "../../Search";
interface ParentProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
  children: React.ReactNode;
}
const Parent = forwardRef<HTMLInputElement, ParentProps>(
  ({ onSubmit, isLoading, children }, ref) => {
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
            <Search isLoading={isLoading} onSubmit={onSubmit} ref={ref} />
            {/* <FilterListRoundedIcon className="cursor-pointer text-white" /> */}
          </div>
        </div>
        {children}
      </div>
    );
  }
);

export default Parent;
