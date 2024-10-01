// @ts-nocheck
"use client";

import React, { useRef, useEffect } from "react";
import { features } from "@/lib/data/websitedata";

const FeaturesList = ({ setVisible, visible }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleIntersection = (entries) => {
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
    <div
      className="md:w-[60%] grid md:grid-cols-2 gap-8 p-4 xs:p-6"
      ref={sectionRef}
    >
      {features.map((feature, index) => (
        <div
          key={feature.id}
          className={`shadow_purple ${
            index === 1 && visible && window.innerWidth > 1020
              ? "bent-div"
              : "shine"
          } hover:border hover:border-gray-300 rounded-[15px] p-4 xs:p-6 bg-dark-bg flex item-center justify-center gap-2 xs:gap-6 flex-col`}
        >
          <span className="text-blue-accent text-3xl xs:text-6xl ">
            {feature.icon}
          </span>
          <p className="text-sm xs:text-lg ">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FeaturesList;
