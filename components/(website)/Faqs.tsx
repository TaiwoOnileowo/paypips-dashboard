"use client";
import React, { useState } from "react";
import Heading from "./Heading";
import { faqs } from "@/lib/data/websitedata";
const Faqs = () => {
  const [index, setIndex] = useState(0);
  return (
    <section
      id="faqs"
      className="bg-dark-bg flex flex-col xl:m-16 xl:rounded-2xl justify-center items-center max-md:p-6 p-12 text-white"
    >
      <Heading text="Frequently Asked Questions" />
      <div className="mt-8 flex flex-col w-full ">
        {faqs.map((faq) => {
          const { id, question, answer } = faq;
          return (
            <div
              key={id}
              className={`accordion cursor-pointer w-full ${
                index === id && "show"
              }`}
              id={id.toString()}
              onClick={() => {
                if (index === id) {
                  setIndex(0);
                  return;
                }
                setIndex(id);
              }}
            >
              <h1 className="title text-[0.6rem] xs:text-[1rem] xsm:text-[1.25rem]">
                <span>{question}</span>
              </h1>
              <div className="content text-[0.6rem] xs:text-[1rem] xsm:text-[1.25rem]">
                <div className="wrapper w-[90%]">
                  <p>{answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Faqs;
