"use client";
import React, { useState, useRef, useEffect } from "react";
import Heading from "./Heading";
import { choose } from "@/lib/data/websitedata";
import { BsStars } from "react-icons/bs";
const WhyChooseUs = () => {
  const [visible, setVisible] = useState(false);

  const sectionRef = useRef(null);

  useEffect(() => {
    const handleIntersection = (entries: any[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
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

  return (
    <section
      ref={sectionRef}
      id="why-choose-us"
      className="bg-white py-16 pt-12 md:pt-16 text-white flex items-center flex-col justify-center relative"
    >
      <div className="blur absolute z-[0] w-[60%]  h-[60%] right-[-50%] top-[-15%] rounded-[50%] opacity-40 bg-shining-gradient" />
      <Heading text="Why Choose Paypips" color={"black"} />
      <div className="flex flex-wrap mt-12 gap-4 xs:gap-6 px-4 xs:px-12 md:px-32 items-center justify-center">
        {choose.map((item) => {
          return (
            <div
              key={item.id}
              className={`flex ${
                visible && "jump-in"
              } bg-dark-bg hover:scale-[1.02]  transition-all ease-out duration-300 border hover:border-gray-300 border-dark-surface px-2 xs:px-4 rounded-full items-center justify-center gap-2 py-[10px] cursor-default`}
            >
              <BsStars className="text-white xs:text-2xl text-sm" />
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
