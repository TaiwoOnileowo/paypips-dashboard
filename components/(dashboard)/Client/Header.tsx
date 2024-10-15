import React from "react";
import BreadCrumb from "../BreadCrumb";

import { FaCircleUser } from "react-icons/fa6";
import { User } from "lucide-react";
import LogoutButton from "../LogoutButton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import SidebarMenuToggle from "../SidebarMenuToggle";
import SubscriptionBanner from "../SubscriptionBanner";
import { Session } from "next-auth";
const ClientHeader = ({ session }: { session: Session }) => {
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
                  <User />
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

export default ClientHeader;
