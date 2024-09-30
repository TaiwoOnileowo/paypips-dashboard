"use client";
import React, { useEffect, useState } from "react";
import { BsCreditCard2BackFill } from "react-icons/bs";
import { FaDollarSign } from "react-icons/fa";
import { FaBitcoinSign } from "react-icons/fa6";
import paystack from "@/assets/images/paystack.svg";
// import { FaMoneyBills } from "react-icons/fa6";

const PaymentsAnimation = () => {
  const [count, setCount] = useState(250);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMoving, setIsMoving] = useState({
    first: false,
    second: false,
    third: false,
  });

  const [scale, setScale] = useState({
    first: false,
    second: false,
    third: false,
  });
  useEffect(() => {
    const sequence = [250, 750, 900, 1500, 3000];
    let index = 0;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setCount(sequence[index]);
      index = (index + 1) % sequence.length;
      setTimeout(() => setIsAnimating(false), 1000);
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const animateBalls = () => {
      setIsMoving({ first: false, second: false, third: false });
      setTimeout(
        () => setIsMoving({ first: true, second: false, third: false }),
        1000
      );
      setTimeout(
        () => setScale({ first: true, second: false, third: false }),
        1000
      );
      setTimeout(
        () => setIsMoving({ first: false, second: true, third: false }),
        2000
      );
      setTimeout(
        () => setScale({ first: false, second: true, third: false }),
        2000
      );
      setTimeout(
        () => setIsMoving({ first: false, second: false, third: true }),
        3000
      );
      setTimeout(
        () => setScale({ first: false, second: false, third: true }),
        3000
      );
    };

    const interval = setInterval(animateBalls, 6000);
    animateBalls();
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative text-white flex items-center justify-center">
      <div className="flex flex-col mx-0 md:mx-4 items-center gap-4 xs:gap-6 md:gap-8">
        <div
          className={`bg-white z-10 text-blue-accent p-2 xs:p-4 rounded-full ${
            scale.first && "scale-forex-div"
          }`}
        >
          <BsCreditCard2BackFill className="text-[20px] xs:text-[40px] md:text-[60px] " />
        </div>
        <div
          className={`${
            scale.second && "scale-forex-div"
          } bg-white z-10 text-primary-purple items-center p-2 xs:p-4 rounded-full`}
        >
          <FaBitcoinSign className="text-[20px] xs:text-[40px] md:text-[60px] " />
        </div>
        <div
          className={`bg-white z-10 text-black p-2 xs:p-4 md:p-6 rounded-full ${
            scale.third && "scale-forex-div"
          }`}
        >
          <img
            src={paystack}
            alt=""
            className="md:w-14 md:h-14 w-6 h-[20px]  xs:w-10 xs:h-10"
          />
        </div>
      </div>
      <hr className="hr-border absolute w-[80px] xs:w-[100px] msm:w-[120px] md:w-[180px] bend1 top-[38%]  xs:top-[35%] left-[18%]" />
      <hr className="hr-border md:w-[140px] w-[60px] xs:w-[80px] msm:w-[100px] " />
      <hr className="hr-border absolute bend2 w-[80px] xs:w-[100px] msm:w-[120px] md:w-[180px] bottom-[38%] xs:bottom-[35%] left-[18%]" />
      <div
        className={`ball ${
          isMoving.first && (window.innerWidth > 1200 ? "first" : "first-sm")
        } top-[21%] msm:top-[18%] md:top-[15%] opacity-0 left-[10%] w-[10px] h-[10px] xs:w-[20px] xs:h-[20px] md:w-[30px] md:h-[30px]`}
      />
      <div
        className={`ball left-[35%] ${
          isMoving.second ? "second-sm-md md:second" : null
        } top-[49%] opacity-0 left-[5%] w-[10px] h-[10px] xs:w-[20px] xs:h-[20px] md:w-[30px] md:h-[30px]`}
      />
      <div
        className={`ball ${
          isMoving.third && (window.innerWidth > 1200 ? "third" : "third-sm-md")
        } opacity-0 bottom-[21%] msm:bottom-[18%] md:bottom-[15%] left-[10%] w-[10px] h-[10px] xs:w-[20px] xs:h-[20px] md:w-[30px] md:h-[30px]`}
      />
      <div
        className={`p-2 xs:p-4 md:p-6 rounded-[15px] flex flex-col items-center gap-6 z-[10] bg-white text-black ${
          isAnimating && "scale-forex-div"
        }`}
      >
        <div className="flex gap-2 xs:gap-4 items-center">
          <div className="bg-blue-accent p-2 xs:p-4 text-white rounded-full">
            <FaDollarSign className="msm:text-[40px] text-[10px] xs:text-[25px]" />
          </div>
          <div className="text-medium-gray">
            <p className="mt-2 text-xs xs:text-lg md:text-xl font-bold">
              Forex Gig
            </p>
            <p className="font-medium msm:text-base text-[8px] xs:text-xs">
              <span className={`${isAnimating ? "animating" : ""}`}>
                {count}
              </span>{" "}
              subscribers
            </p>
          </div>
        </div>
        <div className=" w-[98px] xs:w-[150px] md:w-[300px]">
          <div className="bg-[#dde0ca]  msm:w-[150px] md:w-[300px] h-[60px] xs:h-[100px] md:h-[200px]" />
          <div className="bg-[#dde0ca] mt-4 msm:w-[150px] md:w-[300px] h-[50px] md:h-[100px]" />
        </div>
      </div>
    </div>
  );
};

export default PaymentsAnimation;
