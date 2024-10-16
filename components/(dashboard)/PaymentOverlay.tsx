"use client";
import { useVerifyPayment } from "@/hooks/clientApiHooks";
import React from "react";
import checkanim from "@/assets/icons/checkanim.gif";
import errorGif from "@/assets/icons/error.gif";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { queryClient } from "@/lib/http";
const PaymentOverlay = ({
  trxRef,
  reference,
  session,
}: {
  trxRef: string;
  reference: string;
  session: Session;
}) => {
  const router = useRouter();
  const userId = session?.user.id;
  const { data, isLoading, isError } = useVerifyPayment(reference, userId);
  let content;
  const closeOverlay = () => {
    queryClient.invalidateQueries({
      queryKey: ["subscription-stats"],
    });
    router.push(`/dashboard/profile`);
  };
  if (isLoading) {
    content = (
      <div className="w-full h-full flex items-center justify-center gap-1 flex-col">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
        <p className="text-2xl font-bold"> Verifying Payment</p>
      </div>
    );
  }
  if (isError) {
    content = (
      <div className="w-full h-full flex items-center justify-center gap-1 flex-col">
        <img src={errorGif.src} alt="errorGif" width={100} />
        <p className="text-2xl font-bold"> Payment Failed</p>
        <button
          className="bg-red-500 p-2 text-white rounded-2xl px-4"
          onClick={closeOverlay}
        >
          Close
        </button>
      </div>
    );
  }
  if (data) {
    content = (
      <div className="w-full h-full flex items-center justify-center  flex-col">
        <img src={checkanim.src} alt="checkanim" width={180} />
        <p className="text-2xl font-bold"> Payment Successful</p>
      </div>
    );
    closeOverlay();
  }

  return (
    <div className="absolute top-0 left-0 w-full h-full flex-col bg-black/50 z-[100] flex items-center justify-center">
      {content}
    </div>
  );
};

export default PaymentOverlay;
