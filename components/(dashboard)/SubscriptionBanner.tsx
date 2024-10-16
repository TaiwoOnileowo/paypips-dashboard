"use client";
import { useMakePayment } from "@/hooks/clientApiHooks";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Session } from "next-auth";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { BsCreditCard2BackFill } from "react-icons/bs";
import { useGetSubscriptionStats } from "@/hooks/clientApiHooks";
const SubscriptionBanner = ({ session }: { session: Session }) => {
  const { data, isLoading, isError, error } = useGetSubscriptionStats(session);
  const router = useRouter();
  const { mutate: makePayment, isPending } = useMakePayment({
    onSuccess: (data) => {
      console.log(data);
      router.push(data.authorization_url);
    },
  });
  const userEmail = session.user.email;
  const handleMakePayment = async () => {
    makePayment(userEmail);
  };

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
    <div className="bg-red-500 w-full h-12 text-white px-5 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <IoMdNotificationsOutline size={18} />
        <p className="text-sm font-semibold max-md:text-xs">
          Your subscription is pending!
        </p>
      </div>
      <div className="flex justify-end font-semibold items-center gap-5 max-md:text-xs text-sm">
        <button
          className="border border-white  whitespace-nowrap rounded-md p-1  px-2 cursor-pointer hover:bg-red-50/10"
          onClick={closeBanner}
        >
          Pay later
        </button>
        <button
          className="border border-white whitespace-nowrap rounded-md p-1 flex gap-2 items-center   px-2 cursor-pointer hover:bg-red-50/10"
          onClick={handleMakePayment}
          disabled={isPending}
        >
          <BsCreditCard2BackFill />
          Pay now
          {isPending && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          )}
        </button>
        <IoMdClose size={18} onClick={closeBanner} />
      </div>
    </div>
  );
};

export default SubscriptionBanner;
