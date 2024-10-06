"use client";
import React, { useRef } from "react";
import { features } from "@/lib/data/websitedata";
import { useInView } from "framer-motion";
const FeaturesList = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.2, once: true });
  return (
    <div
      className="xl:w-[50%] max-xl:w-full grid  md:grid-cols-2 gap-8"
      ref={sectionRef}
    >
      {features.map((feature, index) => (
        <div
          key={feature.id}
          className={`shadow_purple ${
            index === 1 && isInView && window.innerWidth > 1020
              ? "bent-div"
              : "shine"
          } border border-transparent hover:border-gray-300 rounded-[15px] p-4 xs:p-6 bg-dark-bg flex item-center justify-center gap-2 xs:gap-6 flex-col`}
        >
          <span className="text-blue-accent text-4xl ">
            {feature.icon}
          </span>
          <p>{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FeaturesList;
