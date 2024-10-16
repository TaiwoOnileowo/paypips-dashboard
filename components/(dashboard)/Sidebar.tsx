"use client";
import React from "react";
import hr from "@/assets/icons/hr.svg";
import Image from "next/image";
import { employeesidebar } from "@/lib/data/employeedata";
import { clientsidebar } from "@/lib/data/clientdata";
import { usePathname } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import { useAppContext } from "@/context";
import logo from "@/public/logo.svg";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { useSession } from "next-auth/react";

const Sidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const splitPathname = pathname?.split("/")[2];
  const { showSidebar, setShowSidebar } = useAppContext();
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const role = session?.user.role;
  const activeSidebar = role === "client" ? clientsidebar : employeesidebar;
  return (
    <div
      className={`col-span-2 px-6 relative  items-center transiton-all duration-300 ease-linear flex flex-col max-xl:fixed ${
        showSidebar ? "max-xl:left-0 " : "max-xl:-left-[100%]"
      } top-0 max-xl:w-[30%] max-md:w-[65%]  py-12 h-screen z-[10]`}
      style={{
        background:
          "linear-gradient(112deg, rgba(6, 11, 38, 0.94) 59.3%, rgba(26, 31, 55, 0.00) 100%)",
      }}
    >
      <IoMdClose
        className="absolute text-white cursor-pointer top-6 right-6 text-xl md:hidden"
        onClick={toggleSidebar}
      />
      <div className="flex items-center  justify-center gap-3 flex-col  h-[4%]">
        <Link
          href="/"
          target="_blank"
          className="flex items-center h-full gap-2 justify-center"
        >
          <Image src={logo} alt="logo" width={60} height={60} />

          {/* <h1 className="text-white font-plus  md:text-xl">PAYPIPS </h1> */}
          <h1 className="text-white font-plus  md:text-xl font-bold">
            SYNCGRAM
          </h1>
        </Link>
        <Image
          src={hr}
          alt="hr"
          width={100}
          height={10}
          className="w-full  h-2"
        />
      </div>
      <div className="items-center flex flex-col gap-1 mt-6 w-full justify-center">
        {activeSidebar.map((item, index) => {
          const path = item.path.split("/")[2];
          const active = path === splitPathname;

          return (
            <Link
              key={index}
              className={`flex items-center max-xl:p-2 p-3   gap-4  w-full rounded-3xl cursor-pointer  ${
                active ? " bg-harshBlue" : ""
              }`}
              href={item.path}
              onClick={() => setShowSidebar(false)}
            >
              <div
                className={`rounded-xl w-8 h-8 ${
                  active ? "bg-sharpBlue" : "bg-harshBlue"
                } flex items-center justify-center`}
              >
                <span className={`${active ? "text-white" : "text-sharpBlue"}`}>
                  {item.icon}
                </span>
              </div>
              <p className="text-white font-plus text-sm font-semibold">
                {item.title}
              </p>
            </Link>
          );
        })}
        <div className="max-xl:px-2 px-3 w-full ">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
