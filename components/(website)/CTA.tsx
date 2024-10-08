
import React from "react";
import Button from "./Button";
const CTA = () => {
  return (
    <section
      id="cta"
      className={`lg:rounded-[0px,0px,30px,30px] relative bg-light-gray flex items-center max-md:p-10 p-16 justify-center w-full`}
    >
      <div className="blur absolute z-[0] w-[60%]  h-[60%] left-[-50%] top-[-30%] rounded-[50%] opacity-40 bg-shining-gradient" />
      <div className="bg-dark-bg flex  flex-col items-center p-10 rounded-2xl xl:w-[50%] ">
        <h2
          className={`font-semibold md:text-4xl max-md:text-2xl text-white w-full}`}
        >
          Lets try Paypips now
        </h2>
        <p
          className={`font-normal text-light-gray text-sm md:text-lg max-w-md mt-4`}
        >
          Focus on the Forex and let&apos;s help you manage your community. Get
          Started with Paypips now!
        </p>
        <Button text="Get Started" className="mt-5" />
      </div>
    </section>
  );
};

export default CTA;
