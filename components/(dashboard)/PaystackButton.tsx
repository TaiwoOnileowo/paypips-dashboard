import { useMakePayment } from "@/hooks/reactQueryHooks";
import React from "react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { BsCreditCard2BackFill } from "react-icons/bs";
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
      className="w-full disabled:bg-sharpBlue/80 px-5 disabled:text-white/50 flex items-center justify-center gap-3 text-white  bg-sharpBlue rounded-md text-sm font-bold font-plus p-2.5"
      disabled={isPending}
      onClick={handleMakePayment}
    >
      <BsCreditCard2BackFill />
      Pay now
      {isPending && (
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
      )}
    </button>
  );
};

export default PaystackButton;
