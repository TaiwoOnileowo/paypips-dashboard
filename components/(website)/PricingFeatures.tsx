import React from "react";
import { FaCheck } from "react-icons/fa6";
const PricingFeatures = ({
  price,
}: {
  price: {
    id: number;
    benefits: string[];
  };
}) => {
  return (
    <>
      <div className="flex my-3 items-center gap-2">
        <div className="md:w-[4px] md:h-[4px] w-[3px] h-[3px] bg-blue-accent rounded-full" />
        <hr className="border-medium-gray opacity-50 w-[100px] md:w-[120px]" />
        <p className="text-xs text-gray-600">Features</p>
        <hr className="border-medium-gray opacity-50 w-[100px] md:w-[120px]" />
        <div className="md:w-[4px] md:h-[4px] w-[3px] h-[3px] bg-blue-accent rounded-full" />
      </div>
      <div className="flex flex-col justify-between md:gap-4">
        <div className="flex gap-2 flex-col">
          {price.benefits.map((benefit, index) => (
            <p
              key={index}
              className="flex gap-2 text-xs md:text-sm items-center"
            >
              <span className="bg-blue-accent p-1 flex items-center justify-center rounded-full">
                <FaCheck className="text-xs text-white" />
              </span>
              {index === 0 && index === 0 ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html:
                      "Card, Bank Transfer <br> USDT, BTC, ETH - Crypto Payment options",
                  }}
                />
              ) : (
                <span key={index} className="">
                  {benefit}
                </span>
              )}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default PricingFeatures;
