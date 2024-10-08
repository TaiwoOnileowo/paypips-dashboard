import { useMakePayment } from "@/hooks/reactQueryHooks";
import React from "react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
const PaystackButton = ({ session }: { session: Session }) => {
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

  return (
    <button
      className="w-full disabled:bg-sharpBlue/50 disabled:text-white/50 flex items-center justify-center text-white gap-5 bg-sharpBlue rounded-2xl  mt-8 text-sm font-bold font-plus p-3"
      disabled={isPending}
      onClick={handleMakePayment}
    >
      Pay with Paystack
      {isPending && (
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
      )}
    </button>
  );
};

export default PaystackButton;
