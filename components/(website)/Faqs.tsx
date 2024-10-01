"use client"
import React, { useState } from "react";
import Heading from "./Heading";
import { faqs } from "@/lib/data/websitedata";
const Faqs = () => {
  const [index, setIndex] = useState(0);
  return (
    <section
      id="faqs"
      className="bg-dark-bg flex flex-col m-8 xsm:m-16 rounded-3xl justify-center items-center py-2 xsm:py-12 md:py-16 md:m-24 lg:m-32 xl:m-40 2xl:m-48 px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-24"
    >
      <Heading text="Frequently Asked Questions" />
      <div className="mt-12 flex flex-col w-full items-start">
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
