import React from "react";

import errorGif from "@/assets/icons/error.gif";
const Error = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center h-full flex-col pt-6 ">
      <img src={errorGif.src} alt="error" width={100} height={100} />
      <p className="text-center text-gray-300/80 mt-2">{message}</p>
    </div>
  );
};

export default Error;
