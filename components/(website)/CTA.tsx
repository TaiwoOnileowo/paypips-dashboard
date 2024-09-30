import React from "react";
import Button from "./Button";

const CTA = () => {
  return (
    <section
      id="cta"
      className={`${
        window.innerWidth > 1020 ? "cta-border" : null
      } relative bg-light-gray flex items-center px-12 py-16 msm:py-32 msm:pb-52 justify-center w-full`}
    >
      {" "}
      <div className="blur absolute z-[0] w-[60%]  h-[60%] left-[-50%] top-[-30%] rounded-[50%] opacity-40 bg-shining-gradient" />
      <svg
        viewBox="0 0 1440 137"
        className="hidden md:block absolute -top-[22%] rotateX"
      >
        <path
          d="M0 137H1440V114.609H346.775C331.995 114.609 318.039 107.799 308.943 96.1501L248.278 18.4586C239.181 6.8092 225.225 0 210.445 0H0V137Z"
          fill="#ebecf0"
        ></path>
      </svg>
      <div className="bg-dark-bg  sm:flex-row flex flex-col msm:gap-32 xsm:px-12 p-6 xs:p-12 xsm:p-16 rounded-[20px] ">
        <div className="flex-1 flex flex-col">
          <h2
            className={`font-semibold xsm:text-[48px] text-[18px] xs:text-3xl text-white w-full}`}
          >
            Lets try Paypips now
          </h2>
          <p
            className={`font-normal text-light-gray text-sm xsm:text-[18px] max-w-[470px] mt-1 xs:mt-5`}
          >
            Start Your Free Trial Now and Transform Your Forex Telegram
            Community Management!
          </p>
        </div>
        <div className={` mt-4 xsm:mt-10`}>
          <Button text="Get Started" />
        </div>
      </div>
    </section>
  );
};

export default CTA;
