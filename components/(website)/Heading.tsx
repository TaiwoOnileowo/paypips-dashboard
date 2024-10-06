import React from "react";
import { BsStars } from "react-icons/bs";
const Heading = ({ text, color }: { text: string; color?: string }) => {
  return (
    <h2
      className={` pt-6 inline-flex items-center scroll-reveal-heading uppercase text-transparent font-bold gap-2 text-sm xs:text-lg ss:text-xl md:text-2xl md:text-center`}
    >
      <BsStars className={`${color ? "text-medium-gray" : " text-white"} max-md:hidden`} />
      {text}
    </h2>
  );
};

export default Heading;
