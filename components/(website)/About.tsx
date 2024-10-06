import React from "react";
import Heading from "./Heading";
const About = () => {
  return (
    <section
      id="about"
      className="bg-dark-bg relative text-white py-24 pb-36 md:pb-32 -mt-2 md:mt-0"
    >
      <div className="blur absolute z-[0] w-[60%]  h-[60%] left-[-50%] top-[70%] rounded-[50%] opacity-40 bg-shining-gradient" />
      <div className="items-center max-w-6xl flex justify-center flex-col mx-auto px-4">
        <Heading text="Introducing Paypips" />
        <div className="background-transition flex mt-10 justify-center items-center max-w-xl lg:max-w-2xl   text-muted-text text-opacity-50 space-y-4  p-8  rounded-lg shadow-lg">
          <p className="text-sm xs:text-base max-md:text-lg text-white  lg:text-2xl text-scroll-reveal md:text-center max-w-2xl">
            PayPips is here to provide top-notch management tools for Forex
            Telegram community owners. Our mission is to help community leaders
            streamline their operations, enhance payment,subscription and
            member engagement and achieve their business goals.
          </p>
        </div>
      </div>
      <svg
        viewBox="0 0 1440 137"
        className=" absolute hidden md:block -bottom-1 rotateX"
      >
        <path
          d="M0 137H1440V114.609H346.775C331.995 114.609 318.039 107.799 308.943 96.1501L248.278 18.4586C239.181 6.8092 225.225 0 210.445 0H0V137Z"
          fill="#fff"
        ></path>
      </svg>
    </section>
  );
};

export default About;
