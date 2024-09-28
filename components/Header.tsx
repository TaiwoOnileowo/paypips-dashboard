"use client";
import React from "react";
import { IoMdHome } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import { IoMdNotifications } from "react-icons/io";
import ViewSidebarRoundedIcon from "@mui/icons-material/ViewSidebarRounded";
import { useAppContext } from "@/context";
import { IoMdMenu } from "react-icons/io";
import { usePathname } from "next/navigation";
import Link from "next/link";
const Header = () => {
  const { showSidebar, setShowSidebar } = useAppContext();
  const pathname = usePathname();
  const splitPathname = pathname?.split("/")[2];
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  console.log(splitPathname);

  return (
    <div className="p-4 md:p-8 flex w-full items-center justify-between top-0">
      <p className="flex gap-2 items-center text-white max-md:text-sm">
        <Link href={"/dashboard"}>
      
          <IoMdHome className="text-white/50 cursor-pointer" />
        </Link>{" "}
        / <span className="capitalize">{splitPathname || "Dashboard"}</span>
      </p>
      <div className="flex gap-5 max-md:gap-4  justify-center items-center text-xl max-md:text-base">
        {showSidebar ? (
          <IoMdMenu className="text-white" onClick={toggleSidebar} />
        ) : (
          <ViewSidebarRoundedIcon
            className="text-white xl:hidden"
            onClick={toggleSidebar}
          />
        )}

        <FaCircleUser className="text-white" />
        <IoMdNotifications className="text-white" />
      </div>
    </div>
  );
};

export default Header;
