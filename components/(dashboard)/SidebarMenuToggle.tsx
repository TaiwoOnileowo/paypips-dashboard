"use client";
import { useAppContext } from "@/context";
import React from "react";
import { IoMdClose } from "react-icons/io";
import { MdOutlineMenu } from "react-icons/md";
const SidebarMenuToggle = () => {
  const { showSidebar, setShowSidebar } = useAppContext();

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  return (
    <>
      {showSidebar ? (
        <IoMdClose className="text-white" onClick={toggleSidebar} />
      ) : (
        <MdOutlineMenu
          className="text-white xl:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default SidebarMenuToggle;
