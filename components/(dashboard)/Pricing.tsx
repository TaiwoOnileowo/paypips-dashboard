"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Session } from "next-auth";
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
import PricingFeatures from "../(website)/PricingFeatures";
import { pricing } from "@/lib/data/websitedata";
import { DialogClose } from "@radix-ui/react-dialog";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useEffect, useState } from "react";
import PaystackButton from "./PaystackButton";

const Pricing = ({ index, session }: { index: number; session: Session }) => {
  const [pricingIndex, setPricingIndex] = useState(index);
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
  const price = pricing[pricingIndex];
  console.log(pricingIndex, "pricingIndex");
  return (
    <>
      {isDesktop ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="rounded-2xl mt-5 px-6 bg-sharpBlue p-3">
            Make payment now
          </DialogTrigger>

          <DialogContent
            className={`flex  flex-col text-medium-gray p-2 xs:p-4 py-6 md:p-6 w-[300px] min-h-[440px] md:w-[400px] transition-all ease col-span-1 cursor-default rounded-[15px] gap-2 bg-light-blue-gradient bg-[#e8f0fc]`}
          >
            {/* <div className=" absolute top-[50%] flex justify-between inset-0">
              <FaAngleLeft size={18} className="cursor-pointer" />
              <FaAngleRight size={18} className="cursor-pointer" />
            </div> */}
            <DialogHeader>
              <DialogTitle className=" text-2xl font-bold">
                {price.name}
              </DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <h3 className="text-blue-accent text-4xl font-bold">
                {price.amount}
              </h3>

              <PricingFeatures price={price} />
            </DialogDescription>
            <DialogFooter className="flex justify-center">
              {/* <DialogClose className="rounded-2xl mt-5 px-6 bg-sharpBlue p-3 text-white"> */}
              <PaystackButton session={session} />
              {/* </DialogClose> */}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger className="rounded-2xl mt-5 px-6 bg-sharpBlue p-3 text-white">
            Make payment now
          </DrawerTrigger>

          <DrawerContent className="flex flex-col items-center">
            <DrawerHeader>
              <DrawerTitle className=" text-2xl font-bold">
                {price.name}
              </DrawerTitle>
            </DrawerHeader>
            <DrawerDescription className="flex flex-col items-center px-14">
              <h3 className="text-blue-accent text-4xl font-bold">
                {price.amount}
              </h3>

              <PricingFeatures price={price} />
            </DrawerDescription>
            <DrawerFooter className="pt-2 flex justify-center items-center">
              {/* <DrawerClose> */}
              <PaystackButton session={session} />
              {/* </DrawerClose> */}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default Pricing;
