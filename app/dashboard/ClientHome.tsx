import React from "react";
import { Session } from "next-auth";
import HomePageStats from "@/components/(dashboard)/Home/HomePageStats";
import MonthlyRevenue from "@/components/(dashboard)/Home/MonthlyRevenue";
import RecentPayments from "@/components/(dashboard)/Home/RecentPayments";
import SubscriptionAlert from "@/components/(dashboard)/SubscriptionAlert";
const ClientHome = ({ session }: { session: Session }) => {
  return (
    <>
      <HomePageStats session={session} />

      <SubscriptionAlert session={session} />
      <div className="w-full lg:grid  lg:grid-cols-12 mt-10  xl:h-[340px] xl:gap-6 max-lg:px-0  gap-6 flex flex-col aspect-square basis-full">
        <div className="col-span-12 max-h-full xl:col-span-5 rounded-3xl bg-cover shadow-md h-full bg-center bg-smile  p-6 xl:pt-14 relative basis-1/3">
          <p className="text-gray-300/80   my-1 md:text-lg">Welcome back,</p>
          <h1 className="text-xl md:text-3xl font-bold text-white">
            {session.user.name || session.user.email}
          </h1>
          <p className="text-gray-300/80 mt-5 md:text-lg">
            Glad to see you again!
          </p>
          <p className="text-gray-300/80  text-lg">How is it going?</p>
        </div>
        <MonthlyRevenue session={session} />
        <RecentPayments session={session} />
      </div>
    </>
  );
};

export default ClientHome;
