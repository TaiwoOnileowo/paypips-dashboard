import { moreFeatures } from "@/lib/data/websitedata";
import React from "react";

const MoreFeatures = ({
  setShowMoreFeatures,
}: {
  setShowMoreFeatures: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <section className="w-full   xs:px-10 xl:px-24 mt-8 flex flex-col items-center justify-center">
      <div className="grid xl:grid-cols-3 md:grid-cols-2  justify-center gap-8  w-full">
        {moreFeatures.map((feature, index) => (
          <div
            key={feature.id}
            className={`shadow_purple jump-in  hover:border hover:border-gray-300 rounded-[15px] p-4 xs:p-6 bg-dark-bg flex gap-4 flex-col`}
          >
            <span className="text-blue-accent text-3xl ">{feature.icon}</span>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MoreFeatures;
