"use client";
import React, { forwardRef } from "react";
import search from "@/assets/icons/search.svg";
import Image from "next/image";
interface SearchProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
}
const Search = forwardRef<HTMLInputElement, SearchProps>(
  ({ onSubmit, isLoading }, ref) => {
    return (
      <div className="flex w-[280px] items-center gap-2 rounded-xl border border-lightGray bg-[#0F1535] pl-2">
        <Image src={search} alt="search" width={20} height={20} />
        <form onSubmit={onSubmit} className="w-full">
          <input
            ref={ref}
            disabled={isLoading}
            type="text"
            className="px-3 disabled:bg-[#0F1535]/50 p-2 bg-[#0F1535] w-full rounded-r-xl text-sm text-white  ring-0 transition-all ease-in outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search..."
          />
        </form>
      </div>
    );
  }
);

export default Search;
