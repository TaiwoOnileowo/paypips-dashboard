import React from "react";
import dollar from "@/assets/icons/dollar2.gif";
import Image from "next/image";
const NotFound = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center pt-10 h-full flex-col w-full">
      <Image src={dollar} alt="dollar" width={100} height={100} />
      {message}
    </div>
  );
};

export default NotFound;
