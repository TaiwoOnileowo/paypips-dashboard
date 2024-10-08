"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { IoMdHome } from "react-icons/io";
const BreadCrumb = () => {
  const pathname = usePathname();
  const splitPathname = pathname?.split("/")[2];
  return (
    <p className="flex gap-2 items-center text-white max-md:text-sm">
      <Link href={"/dashboard"}>
        <IoMdHome className="text-white/50 cursor-pointer" />
      </Link>{" "}
      / <span className="capitalize">{splitPathname || "Dashboard"}</span>
    </p>
  );
};

export default BreadCrumb;
