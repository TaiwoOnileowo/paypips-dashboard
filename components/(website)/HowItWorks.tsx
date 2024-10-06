"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaCheckCircle, FaChartLine, FaUsers } from "react-icons/fa";
import logo from "@/assets/images/logo_purple.png";
import Heading from "./Heading";
import Image from "next/image";

const HowItWorks = () => {
  const [chatAnimation, setChatAnimation] = useState({
    first_response: false,
    second_response: false,
    third_response: false,
    fourth_response: false,
  });

  const [moveAnimation, setMoveAnimation] = useState(false);
  const [manageAnimation, setManageAnimation] = useState(false);
  const [visible, setVisible] = useState<boolean>();
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleIntersection = (entries: any[]) => {
      entries.forEach((entry: { isIntersecting: any }) => {
        if (entry.isIntersecting) {
          setVisible(true);

          initiateChatAnimation();
          setMoveAnimation(true);
        } else {
          resetAnimations();
          setVisible(false);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.2,
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const initiateChatAnimation = () => {
    resetChatAnimation();

    setTimeout(() => {
      setChatAnimation((prev) => ({ ...prev, first_response: true }));
    }, 1000);
    setTimeout(() => {
      setChatAnimation((prev) => ({ ...prev, second_response: true }));
    }, 2000);
    setTimeout(() => {
      setChatAnimation((prev) => ({ ...prev, third_response: true }));
    }, 3000);
    setTimeout(() => {
      setChatAnimation((prev) => ({ ...prev, fourth_response: true }));
    }, 4000);
  };

  const resetChatAnimation = () => {
    setChatAnimation({
      first_response: false,
      second_response: false,
      third_response: false,
      fourth_response: false,
    });
  };

  const resetAnimations = () => {
    resetChatAnimation();
    setMoveAnimation(false);
    setManageAnimation(false);
  };

  const initiateMoveAnimation = () => {
    setMoveAnimation(false);
    setTimeout(() => {
      setMoveAnimation(true);
    }, 1000);
  };

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative bg-white flex flex-col items-center justify-center  p-8 md:pb-48  md:px-16 text-light-text"
    >
      <Heading text="How It Works" color="black" />
      <div className="grid lg:grid-cols-3 grid-cols-1 md:gap-10  gap-5 items-center justify-center mt-10">
        <div
          onMouseEnter={initiateChatAnimation}
          className={`light-blue-gradient p-6 ${visible && "jump-in"}
          } xs:space-y-2 rounded-[15px] h-[180px] xs:h-[380px] md:h-[400px] w-[200px] xs:w-[300px] md:w-[380px] shadow-xl transition-transform transform hover:scale-[1.02] hover:shadow-2xl`}
        >
          <p className="text-medium-gray text-sm xs:text-base md:text-lg">
            Step 1
          </p>
          <h2 className=" text-transparent gradient-text font-bold text-xl xs:text-2xl md:text-3xl">
            SIGN UP
          </h2>
          <p className="text-medium-gray text-sm xs:text-base md:text-lg xs:mb-4">
            Launch Paypips and build your subscription bot for Telegram
          </p>
          <div className="h-[200px] flex-col justify-end hidden xs:flex">
            <p className="justify-end text-[20px] flex items-center pop-in">
              <span
                className={`justify-center py-2 px-6 rounded-full ${
                  chatAnimation.first_response ? "flex show" : "hidden"
                } flex items-center bg-blue-accent text-sm text-white w-[120px]`}
              >
                Hey
              </span>
            </p>
            <p
              className={`justify-start items-center pop-in ${
                chatAnimation.second_response ? "flex show" : "hidden"
              }`}
            >
              <span className="justify-center py-2 mt-2 text-center px-2 rounded-full text-sm flex items-center bg-primary-purple text-white w-[370px]">
                Want to manage your telegram community with ease?
              </span>
            </p>
            <p
              className={`justify-end items-center pop-in ${
                chatAnimation.third_response ? "flex show" : "hidden"
              }`}
            >
              <span className="justify-center py-2 mt-2 px-6 rounded-full flex items-center bg-blue-accent text-sm text-white w-[120px]">
                Yes
              </span>
            </p>
            <p
              className={`justify-start items-center pop-in ${
                chatAnimation.fourth_response ? "flex show" : "hidden"
              }`}
            >
              <span className="justify-center mt-2 py-2 px-6 rounded-full flex items-center bg-primary-purple text-white w-[250px]">
                Get started with Paypips
              </span>
            </p>
          </div>
        </div>
        <div
          onMouseEnter={initiateMoveAnimation}
          className={`light-blue-gradient h-[180px] xs:h-[380px] md:h-[400px] w-[200px] xs:w-[300px] md:w-[380px]  flex flex-col gap-16 ${
            visible && "jump-in"
          } rounded-[15px] p-6  space-y-2 shadow-xl transition-transform transform hover:scale-[1.02] hover:shadow-2xl`}
        >
          <div>
            <p className="text-medium-gray text-sm xs:text-base md:text-lg">
              Step 2
            </p>
            <h2 className="gradient-text text-transparent font-bold text-xl xs:text-2xl md:text-3xl">
              INTEGRATE
            </h2>
            <p className="text-medium-gray text-sm xs:text-base md:text-lg">
              Connect your Telegram community seamlessly.
            </p>
          </div>
          <div className="relative items-end mt-4 hidden xs:flex">
            <svg
              stroke="currentColor"
              fill="url(#gradient)"
              strokeWidth="0"
              viewBox="0 0 448 512"
              className="text-4xl md:text-5xl"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="gradient" gradientTransform="rotate(135)">
                  <stop offset="0%" stopColor=" #5e19b3" />
                  <stop offset="50%" stopColor="#5f15b3" />
                  <stop offset="100%" stopColor="#3d87f5" />
                </linearGradient>
              </defs>
              <path d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z"></path>
            </svg>
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className={`absolute ${
                  moveAnimation ? "animate-move" : ""
                } w-2 h-2 rounded-full bg-primary-purple`}
                style={{ animationDelay: `${index * 0.3}s` }}
              />
            ))}
            <hr className="border-dark-bg w-[200px] mx-4" />
            <Image
              src={logo}
              alt="Paypips Logo"
              className="md:w-12 md:h-12 w-10 h-10 object-contain"
            />
          </div>
        </div>
        <div
          onMouseEnter={() => {
            setManageAnimation(true);
          }}
          className={`light-blue-gradient h-[180px] xs:h-[380px] md:h-[400px] w-[200px] xs:w-[300px] md:w-[380px]  rounded-[15px] border flex flex-col gap-16 p-6 space-y-2 shadow-xl transition-transform transform  hover:scale-[1.02] hover:shadow-2xl ${
            visible && "jump-in"
          }
          }`}
        >
          <div>
            <p className="text-medium-gray text-sm xs:text-base md:text-lg">
              Step 3
            </p>
            <h2 className="gradient-text text-transparent font-bold text-xl xs:text-2xl md:text-3xl">
              MANAGE
            </h2>
            <p className="text-medium-gray text-sm xs:text-base md:text-lg">
              Use our tools to manage your members and content effectively.
            </p>
          </div>
          <div className="items-center justify-center gap-4 mt-4 hidden xs:flex">
            <FaChartLine
              className={`text-6xl text-primary-purple ${
                manageAnimation ? "animate-pulse" : ""
              }`}
            />
            <FaUsers
              className={`text-6xl text-primary-purple ${
                manageAnimation ? "animate-pulse" : ""
              }`}
            />
            <FaCheckCircle
              className={`text-6xl text-primary-purple bg-white w-[60px] rounded-full ${
                manageAnimation ? "animate-pulse" : ""
              }`}
            />
          </div>
        </div>
      </div>
      <svg viewBox="0 0 1440 137" className="hidden md:block absolute -bottom-4">
        <path
          d="M0 137H1440V114.609H346.775C331.995 114.609 318.039 107.799 308.943 96.1501L248.278 18.4586C239.181 6.8092 225.225 0 210.445 0H0V137Z"
          fill="#14181f"
        ></path>
      </svg>
    </section>
  );
};

export default HowItWorks;
