"use client";
import React, { useState, useEffect } from "react";
import { Session } from "next-auth";
import card from "@/assets/icons/card.gif";
import { BsCreditCard2BackFill } from "react-icons/bs";
import { useGetSubscriptionStats } from "@/hooks/reactQueryHooks";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import PaystackButton from "./PaystackButton";
const SubscriptionAlert = ({ session }: { session: Session }) => {
  const { data, isLoading, isError, error } = useGetSubscriptionStats(session);
  const plan = data?.subscriptionPlan;
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (plan?.status.toLowerCase() === "pending") {
      setOpen(true);
    }
  }, [plan?.status]);
  if (isLoading || isError) {
    return null;
  }
  const closePaymentAlert = () => {
    setOpen(false);
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="bg-red-500">
        <AlertDialogHeader className="flex flex-col items-center">
          <img src={card.src} width={100} height={100} alt="Card" />
          <AlertDialogTitle className="text-white text-2xl">
            Pending Subscription
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-200 text-center">
            Oops, your subscription is pending! Please complete your payment to
            continue enjoying our services.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-center justify-center gap-2 w-full">
          <AlertDialogCancel onClick={closePaymentAlert} className="w-full">
            I&apos;ll do it later
          </AlertDialogCancel>
          <AlertDialogAction asChild className="w-full">
            <div className="max-md:w-full !bg-sharpBlue rounded-md">
              <PaystackButton session={session} />
            </div>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SubscriptionAlert;
