import React from "react";

import Heading from "./Heading";
import { FaCheck } from "react-icons/fa";
import DashboardAnimation from "./DashboardAnimation";
import Button from "./Button";
const Dashboard = () => {
  return (
    <section className="bg-dark-bg xsm:my-24 xsm:mb-48 xsm:rounded-[30px] xsm:mx-16 flex-col items-center pb-16 xsm:pb-32 px-4 xs:px-12 justify-center pt-12 flex">
      <Heading text="Paypips Dashboard" />
      <div className="flex flex-col xsm:flex-row-reverse xsm:mt-24 gap-12 w-full md:gap-0 text-white items-center justify-center">
        <div className="xsm:w-[50%] flex justify-center flex-col ">
          <h3 className="uppercase text-blue-accent py-2 text-sm md:text-base hidden xsm:block">
            Dashboard
          </h3>
          <h1 className="text-xl xs:text-4xl xsm:text-xl msm:text-4xl md:text-5xl font-bold py-4">
            Explore Paypips' powerful Dashboard
          </h1>
          <p className="mb-2 text-sm md:text-base">
            With Paypips Dashboard, you can:
          </p>
          <ul className="flex text-muted-text text-sm md:text-base justify-center gap-4 flex-col">
            <li className="flex items-center gap-2">
              <span className="bg-primary-purple w-4 md:w-6 h-4 md:h-6  flex items-center justify-center rounded-full">
                <FaCheck className="text-xs" />
              </span>
              Explore your users, customers, payments, and subscriptions
            </li>
            <li className="flex items-center gap-2">
              <span className="bg-primary-purple w-4 md:w-6 h-4 md:h-6  flex items-center justify-center rounded-full">
                <FaCheck className="text-xs" />
              </span>
              Get valuable insights
            </li>
            <li className="flex items-center gap-2">
              <span className="bg-primary-purple w-4 md:w-6 h-4 md:h-6  flex items-center justify-center rounded-full">
                <FaCheck className="text-xs" />
              </span>
              Support your subscribers 1-1
            </li>
          </ul>
          <Button text="Start For Free" />
        </div>
        <DashboardAnimation />
      </div>
    </section>
  );
};

export default Dashboard;
