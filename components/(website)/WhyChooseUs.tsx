"use client";
import React, { useState, useRef } from "react";
import Heading from "./Heading";
import { choose } from "@/lib/data/websitedata";
import { BsStars } from "react-icons/bs";
import { useInView } from "framer-motion";
const WhyChooseUs = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.2, once: true });

  return (
    <section
      ref={sectionRef}
      id="why-choose-us"
      className="bg-white py-16 p-12 text-white flex items-center flex-col justify-center relative"
    >
      <div className="blur absolute z-[0] w-[60%]  h-[60%] right-[-50%] top-[-15%] rounded-[50%] opacity-40 bg-shining-gradient" />
      <Heading text="Why Choose Paypips" color={"black"} />
      <div className="grid lg:grid-cols-3 mt-12 gap-4 xs:gap-6  items-center justify-center">
        {choose.map((item) => {
          return (
            <div
              key={item.id}
              className={`flex ${
                isInView && "jump-in"
              } bg-dark-bg hover:scale-[1.02]  transition-all px-5 ease-out duration-300 border hover:border-gray-300 border-dark-surface p-3 rounded-full items-center justify-center gap-2 cursor-default`}
            >
              <BsStars className="text-white xs:text-2xl text-sm max-lg:hidden" />
              <p className="text-light-gray text-center text-sm xs:text-base">
                {item.title}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WhyChooseUs;
