import HomePageStats from "@/components/Home/HomePageStats";
import React from "react";

import { auth } from "@/auth";
import { getStats } from "@/lib/actions/stats.actions";

import { redirect } from "next/navigation";
import MonthlyRevenue from "@/components/Home/MonthlyRevenue";
import RecentPayments from "@/components/Home/RecentPayments";

const Page = async () => {
  const session = await auth();

  const stats = await getStats(session);
  console.log(stats, "stats");

  if (!session?.user) redirect("/sign-in");
  // console.log(session);
  const payments = [
    {
      amount: "$600",
      email: "onileowo@gmail.com",
      plan: "Signal Monthly",
    },
    {
      amount: "$500",
      email: "boluwatife@gmail.com",
      plan: "Mentorship Group",
    },
    {
      amount: "$1000",
      email: "dax@gmail.com",
      plan: "Mentorship Private",
    },
    {
      amount: "$100",
      email: "emma@gmail.com",
      plan: "Mentorship Group",
    },
  ];
  return (
    <div className="p-6 ">
      <HomePageStats session={session} />
      <div className="w-full lg:grid  lg:grid-cols-12 mt-10  xl:h-[340px] xl:gap-6 max-lg:px-0  gap-6 flex flex-col aspect-square basis-full">
        <div className="col-span-12 max-h-full xl:col-span-5 rounded-3xl bg-cover shadow-md h-full bg-center bg-smile  p-6 xl:pt-14 relative basis-1/3">
          <p className="text-gray-300/80   my-1 md:text-lg">Welcome back,</p>
          <h1 className="text-xl md:text-3xl font-bold text-white">
            Onileowo Taiwo
          </h1>
          <p className="text-gray-300/80 mt-5 md:text-lg">
            Glad to see you again!
          </p>
          <p className="text-gray-300/80  text-lg">How is it going?</p>
        </div>
        <MonthlyRevenue session={session} />
        <RecentPayments session={session} />
      </div>
    </div>
  );
};

export default Page;
