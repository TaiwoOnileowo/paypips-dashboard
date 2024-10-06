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

const Pricing = () => {
  const [clickedIndex, setClickedIndex] = useState(1);
  const [screenWidth, setScreenWidth] = useState(0);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const screenWidth = window.innerWidth;
    console.log(screenWidth);
    const handleResize = () => {
      setScreenWidth(screenWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const isDesktop = screenWidth > 768;
  console.log(screenWidth, isDesktop);
  return (
    <section
      id="pricing"
      className="relative bg-white pt-12 pb-24 md:pb-48 flex flex-col justify-center items-center"
    >
      <Heading text="Pricing" color={"black"} />

      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-10 mt-24">
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

              <div className="flex my-3 items-center gap-2">
                <div className="md:w-[4px] md:h-[4px] w-[3px] h-[3px] bg-blue-accent rounded-full" />
                <hr className="border-medium-gray opacity-50 w-[100px] md:w-[120px]" />
                <p className="text-xs text-gray-600">Features</p>
                <hr className="border-medium-gray opacity-50 w-[100px] md:w-[120px]" />
                <div className="md:w-[4px] md:h-[4px] w-[3px] h-[3px] bg-blue-accent rounded-full" />
              </div>
              <div className="flex flex-col justify-between md:gap-4">
                <div className="flex gap-2 flex-col">
                  {Object.values(price.benefits).map((benefit, index) => (
                    <p
                      key={index}
                      className="flex gap-2 text-xs md:text-sm items-center"
                    >
                      <span className="bg-blue-accent p-1 flex items-center justify-center rounded-full">
                        <FaCheck className="text-xs text-white" />
                      </span>
                      {index === 0 && idx === 0 ? (
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
                  <DialogContent className="sm:max-w-[425px] flex flex-col items-center">
                    <DialogHeader>
                      <DialogTitle className="text-center text-2xl font-bold">
                        {price.name}
                      </DialogTitle>
                      <DialogDescription className="text-center">
                        {price.ctatext}
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
                    </DialogHeader>
                  </DialogContent>
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
    </section>
  );
};

export default Pricing;
