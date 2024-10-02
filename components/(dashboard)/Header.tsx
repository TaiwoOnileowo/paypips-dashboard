"use client";
import React from "react";
import { IoMdHome } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import { IoMdNotifications } from "react-icons/io";
import profilewhite from "@/assets/icons/profile-white.svg";
import profileblue from "@/assets/icons/profile-blue.svg";
import ViewSidebarRoundedIcon from "@mui/icons-material/ViewSidebarRounded";
import { useAppContext } from "@/context";
import { IoMdMenu } from "react-icons/io";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { AiOutlineMenuFold } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { MdOutlineMenu } from "react-icons/md";
const Header = () => {
  const { showSidebar, setShowSidebar } = useAppContext();
  const pathname = usePathname();
  const splitPathname = pathname?.split("/")[2];
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

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
          <IoMdClose className="text-white" onClick={toggleSidebar} />
        ) : (
          <MdOutlineMenu className="text-white xl:hidden" onClick={toggleSidebar} />
        )}
        <Popover>
          <PopoverTrigger>
            <FaCircleUser className="text-white cursor-pointer" />
          </PopoverTrigger>
          <PopoverContent className="flex flex-col gap-2 bg-[rgba(34,41,78,0.94)] text-white  w-fit">
            <Link
              className={`flex items-center gap-4  w-full rounded-3xl cursor-pointer  `}
              href="/dashboard/profile"
            >
              <div
                className={`rounded-xl w-8 h-8 bg-harshBlue flex items-center justify-center`}
              >
                <Image src={profileblue} alt="Profile" width={15} height={15} />
              </div>
              <p className="text-white font-plus text-sm  font-semibold">
                View Profile
              </p>
            </Link>
            <LogoutButton />
          </PopoverContent>
        </Popover>
        {/* <IoMdNotifications className="text-white" /> */}
        {/* TO-BE-IMP */}
      </div>
    </div>
  );
};

export default Header;
