"use client";
import React, { useState, useEffect } from "react";
import { Session } from "next-auth";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { BsCreditCard2BackFill } from "react-icons/bs";
import { useGetSubscriptionStats } from "@/hooks/reactQueryHooks";
const SubscriptionBanner = ({ session }: { session: Session }) => {
  const { data, isLoading, isError, error } = useGetSubscriptionStats(session);
  const plan = data?.subscriptionPlan;
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (plan?.status.toLowerCase() === "pending") {
      setOpen(true);
    }
  }, [plan?.status]);
  if (isLoading || isError || !open) {
    return null;
  }
  const closeBanner = () => {
    setOpen(false);
  };
  return (
    <div className="bg-red-500 w-full h-10 text-white px-5 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <IoMdNotificationsOutline size={18} />
        <p className="text-sm font-semibold">Your subscription is pending!</p>
      </div>
      <div className="flex justify-end font-semibold items-center gap-5 text-sm">
        <button className="border border-white rounded-md p-1  px-2 cursor-pointer hover:bg-red-50/10">
          I&apos;ll pay later
        </button>
        <button className="border border-white rounded-md p-1   px-2 cursor-pointer hover:bg-red-50/10">
          Pay now
        </button>
        <IoMdClose size={18} onClick={closeBanner} />
      </div>
    </div>
  );
};

export default SubscriptionBanner;
