"use client"
import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const DashboardAnimation = () => {
  const [showSecond, setShowSecond] = useState(false);
  useEffect(() => {
    const timeout1 = setTimeout(() => {
      setShowSecond(true);
    }, 2000);
    const timeout2 = setTimeout(() => {
      setShowSecond(false);
    }, 4000);
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [showSecond]);
  return (
    <div className="relative flex flex-col w-full xsm:w-[50%] justify-center items-center">
      <div
        className={`fade-in justify-center  ${showSecond ? "hidden" : "flex"} items-center p-6 flex-col bg-muted-text w-full  h-[180px] xs:w-[300px] md:w-[400px] gap-4 xs:h-[250px] rounded-[15px]`}
      >
        <div>
          <h1 className="inline-flex gap-2 text-medium-gray text-sm xs:text-xl md:text-2xl items-center">
            Volume From Sales{" "}
            <span className="bg-primary-purple text-white p-2 rounded-[15px]">
              +30%
            </span>
          </h1>
        </div>
        <div className="w-full h-full flex items-end gap-4 justify-center">
          <div className="bar" style={{ "--bar-height": "20%" } as React.CSSProperties} />
          <div className="bar" style={{ "--bar-height": "40%" } as React.CSSProperties} />
          <div className="bar" style={{ "--bar-height": "60%" } as React.CSSProperties} />
          <div className="bar" style={{ "--bar-height": "90%" } as React.CSSProperties} />
        </div>
      </div>
      <div
        className={`text-sm xs:text-xl md:text-2xl w-full ${showSecond ? "flex" : "hidden"}  fade-in p-6 text-medium-gray flex-col  bg-muted-text  h-[180px] xs:w-[300px] md:w-[400px] gap-2 xs:h-[250px] rounded-[15px] `}
      >
        <h1 className="  inline-flex items-center gap-2">
          <FaUserCircle />
          Timmy Dax
        </h1>
        <div className="flex gap-2 xs:gap-4  py-2 w-full items-center justify-center">
          <p className="bg-blue-accent px-2 xs:px-4 rounded-full text-base xs:text-lg pop-up text-white">
            Customer
          </p>
          <p className="bg-primary-purple px-2 xs:px-4 rounded-full text-base xs:text-lg pop-up   text-white">
            Afilliate
          </p>
        </div>
        <p>LTV: $800</p>
        <hr className="w-full border-light-gray" />
        <p>Signed Up on May 28th, 2023</p>
      </div>
    </div>
  );
};

export default DashboardAnimation;
