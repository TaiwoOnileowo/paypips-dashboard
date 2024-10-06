import React from "react";
import { FaCheck } from "react-icons/fa";

import Heading from "./Heading";
import PaymentsAnimation from "./PaymentsAnimation";
import Button from "./Button";

const Payments = () => {
  return (
    <section
      id="payments-with-ease"
      className="relative bg-dark-bg flex p-12 w-full  flex-col items-center justify-center text-white"
    >
      <div className="blur absolute z-[0] w-[60%] h-[60%] left-[-50%] top-[-15%] rounded-[50%] opacity-40 bg-shining-gradient" />
      <Heading text="Payments With Ease" />
      <div className="flex max-lg:flex-col gap-16 md:gap-16 mt-8 w-full">
        <div className="w-full xl:w-[50%] flex justify-center flex-col">
          <h3 className="uppercase text-blue-accent text-sm md:text-base py-2 hidden xsm:block">
            Flexible Payments
          </h3>
          <h1 className="text-xl xs:text-4xl md:text-5xl font-bold py-4">
            Accept payments <br /> with ease
          </h1>
          <ul className="flex text-muted-text text-sm md:text-base justify-center gap-4 flex-col">
            <p className="text-sm md:text-base">
              With Paypips, you can accept any payments with ease:
            </p>
            <li className="flex items-center gap-2 ">
              <span className="bg-primary-purple w-4 md:w-6 h-4 md:h-6 flex items-center justify-center  rounded-full">
                <FaCheck className="text-xs" />
              </span>
              Accept credit/debit cards, crypto, or even cash
            </li>
            <li className="flex items-center gap-2">
              <span className="bg-primary-purple w-4 md:w-6 h-4 md:h-6 flex items-center justify-center  rounded-full">
                <FaCheck className="text-xs" />
              </span>
              Accept credit/debit cards, or even cash
            </li>
            <li className="flex items-center gap-2">
              <span className="bg-primary-purple w-4 md:w-6 h-4 md:h-6 flex items-center justify-center  rounded-full">
                <FaCheck className="text-xs" />
              </span>
              Set up access tiers
            </li>
            <li className="flex items-center gap-2">
              <span className="bg-primary-purple w-4 md:w-6 h-4 md:h-6 flex items-center justify-center  rounded-full">
                <FaCheck className="text-xs" />
              </span>
              Add free trials
            </li>
          </ul>
          <Button text="Get Started" />
        </div>
        <PaymentsAnimation />
      </div>
    </section>
  );
};

export default Payments;
