import { moreFeatures } from "@/lib/data/websitedata";
import React from "react";

import { IoIosArrowUp } from "react-icons/io";
const MoreFeatures = ({ setShowMoreFeatures }) => {
  return (
    <section className="w-full ">
      <div className="grid xsm:grid-cols-2 md:grid-cols-3 xsm:px-24 justify-center gap-8 py-12 w-full">
        {moreFeatures.map((feature, index) => (
          <div
            key={feature.id}
            className={`shadow_purple jump-in w-[200px] xs:w-[280px] msm:w-[350px]  hover:border hover:border-gray-300 rounded-[15px] p-4 xs:p-6 bg-dark-bg flex gap-4 flex-col`}
          >
            <span className="text-blue-accent text-lg xs:text-2xl msm:text-3xl ">
              {feature.icon}
            </span>
            <p className="text-sm xs:text-base msm:text-lg">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
      <a href="#features">
        <div
          className="my-8 py-4 xs:py-8 background-transition1 w-full cursor-pointer flex items-center justify-center"
          onClick={() => setShowMoreFeatures(false)}
        >
          <h2 className="text-base xs:text-2xl inline-flex fade-in-text cursor-pointer z-[1] items-center gap-2 ">
            View Less <IoIosArrowUp />
          </h2>
        </div>
      </a>
    </section>
  );
};

export default MoreFeatures;
