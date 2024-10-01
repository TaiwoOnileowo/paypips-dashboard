import React from "react";
import dollar from "@/assets/icons/dollar1.gif";
import Image from "next/image";
const NotFound = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center pt-10 h-full flex-col w-full">
      <img src={dollar.src} alt="dollar" width={100} height={100} />
      {message}
    </div>
  );
};

export default NotFound;
