"use client";
import Heading from "./Heading";
import { FaCheck } from "react-icons/fa6";
import { pricing } from "@/lib/data/websitedata";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Button from "./Button";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DialogClose } from "@radix-ui/react-dialog";
import PricingFeatures from "./PricingFeatures";

const Pricing = () => {
  const [clickedIndex, setClickedIndex] = useState(1);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isDesktop = screenWidth > 768;
 
  return (
    <section
      id="pricing"
      className="relative bg-white p-12 flex flex-col justify-center items-center"
    >
      <Heading text="Pricing" color={"black"} />

      <div className="grid grid-cols-1 xl:grid-cols-3 items-center gap-10 mt-24">
        {pricing.map((price, idx) => {
          let ctaLink = "https://t.me/paypips_adminBot";
          return (
            <div
              key={price.id}
              className={`flex ${
                idx == 1 ? "border-2 border-blue-accent" : ""
              }  flex-col text-medium-gray p-2 xs:p-4 py-6 md:p-6 hover:scale-[1.02] w-[300px] min-h-[440px] md:w-[400px] transition-all ease col-span-1 cursor-default rounded-[15px] gap-2 light-blue-gradient 
           `}
            >
              <div className="flex justify-between">
                <h1 className="">{price.name}</h1>
                {idx === 1 && (
                  <div
                    className={`w-6 h-6 rounded-full bg-blue-accent flex items-center justify-center `}
                  >
                    <FaCheck className="text-xs text-white " />
                  </div>
                )}
              </div>

              <h1 className="text-2xl md:text-4xl text-blue-accent  font-bold">
                {price.amount}
                {idx !== 0 && (
                  <span className="text-sm text-medium-gray">/month</span>
                )}
              </h1>

              <PricingFeatures price={price} />
              {isDesktop ? (
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <div className="flex items-end h-full justify-center ">
                      <Button
                        className="w-[350px]"
                        text="Get Started"
                        onClick={() => setClickedIndex(idx)}
                      />
                    </div>
                  </DialogTrigger>
                  {clickedIndex === idx && (
                    <DialogContent
                      className={`flex   flex-col text-medium-gray p-2 xs:p-4 py-6 md:p-6 w-[300px] min-h-[440px] md:w-[400px] transition-all ease col-span-1 cursor-default rounded-[15px] gap-2 light-blue-gradient`}
                    >
                      <DialogHeader>
                        <DialogTitle>
                          <h1 className=" text-2xl font-bold">{price.name}</h1>
                        </DialogTitle>
                      </DialogHeader>
                      <DialogDescription>
                        <h1 className="text-2xl md:text-4xl text-blue-accent  font-bold">
                          {price.amount}
                          {idx !== 0 && (
                            <span className="text-sm text-medium-gray">
                              /month
                            </span>
                          )}
                        </h1>
                        <PricingFeatures price={price} />
                      </DialogDescription>
                      <DialogFooter className="flex justify-center">
                        <DialogClose>
                          <Link href={ctaLink} target="_blank">
                            <Button
                              className="w-[200px]"
                              text="Proceed to Bot"
                              onClick={() => setClickedIndex(idx)}
                            />
                          </Link>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  )}
                </Dialog>
              ) : (
                <Drawer open={open} onOpenChange={setOpen}>
                  <DrawerTrigger asChild>
                    <div className="flex items-end h-full justify-center ">
                      <Button
                        className="w-[350px]"
                        text="Get Started"
                        onClick={() => setClickedIndex(idx)}
                      />
                    </div>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader className="text-left">
                      <DrawerTitle className="text-center text-2xl font-bold">
                        {price.name}
                      </DrawerTitle>
                      <DrawerDescription className="text-center">
                        {price.ctatext}
                      </DrawerDescription>
                    </DrawerHeader>

                    <DrawerFooter className="pt-2 flex justify-center items-center">
                      <DrawerClose>
                        <Link href={ctaLink} target="_blank">
                          <Button
                            className="w-[200px]"
                            text="Proceed to Bot"
                            onClick={() => setClickedIndex(idx)}
                          />
                        </Link>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              )}
            </div>
          );
        })}
      </div>
      <svg
        viewBox="0 0 1440 137"
        className="hidden md:block absolute -bottom-4"
      >
        <path
          d="M0 137H1440V114.609H346.775C331.995 114.609 318.039 107.799 308.943 96.1501L248.278 18.4586C239.181 6.8092 225.225 0 210.445 0H0V137Z"
          fill="#14181f"
        ></path>
      </svg>
    </section>
  );
};

export default Pricing;
