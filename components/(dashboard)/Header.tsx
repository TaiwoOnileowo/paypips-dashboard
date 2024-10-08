import React from "react";

import { FaCircleUser } from "react-icons/fa6";

import profileblue from "@/assets/icons/profile-blue.svg";

import Image from "next/image";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

import BreadCrumb from "./BreadCrumb";
import { auth } from "@/auth";
import SubscriptionBanner from "./SubscriptionBanner";
import SidebarMenuToggle from "./SidebarMenuToggle";
const Header = async () => {
  const session = await auth();
  if (!session) return null;

  return (
    <>
      <SubscriptionBanner session={session} />
      <div className="p-4 md:p-8 flex w-full items-center justify-between top-0">
        <BreadCrumb />
        <div className="flex gap-5 max-md:gap-4  justify-center items-center text-xl max-md:text-base">
          <SidebarMenuToggle />
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
                  <Image
                    src={profileblue}
                    alt="Profile"
                    width={15}
                    height={15}
                  />
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
    </>
  );
};

export default Header;
