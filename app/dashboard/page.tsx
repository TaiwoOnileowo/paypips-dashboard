import HomePageStats from "@/components/HomePageStats";
import React from "react";
import smilyface from "@/assets/icons/smilyface.svg";
import Image from "next/image";
import checkgreen from "@/assets/icons/check-green.svg";
import cart from "@/assets/icons/cart-blue.svg";
import { auth } from "@/auth";
import { getStats } from "@/lib/actions/homepage.actions";
import { Stats } from "@/types";
import { redirect } from "next/navigation";
export async function generateStaticParams() {
  const session = await auth();
  const stats = await getStats(session);
  console.log(stats);
  return stats;
}
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
      <HomePageStats stats={stats} />
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
        <div
          className="col-span-6 xl:col-span-3 max-xl:max-h-[350px] h-full rounded-3xl p-6 text-white basis-1/3"
          style={{
            background:
              "linear-gradient(127deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)",
          }}
        >
          <h2 className="font-bold  text-lg">This Month&apos;s Revenue</h2>
          <p className="text-gray-300/80 mt-1">From all plans</p>
          <div className="flex flex-col  items-center justify-between h-[200px] gap-2 mt-10 pb-4">
            <div className="rounded-full w-14 h-14 bg-sharpBlue flex items-center justify-center">
              <Image src={smilyface} alt="smilyface" width={30} height={30} />
            </div>
            <div
              className="flex w-full justify-center items-center rounded-3xl bg-black/30 p-4 text-xl font-bold text-white"
              style={{
                background:
                  "linear-gradient(127deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(10, 14, 35, 0.71) 91.2%)",
                backdropFilter: "blur(60px)",
              }}
            >
              {(stats?.amountstats?.monthAmount &&
                `${stats?.amountstats?.monthAmount}%`) ||
                "N/A"}
            </div>
          </div>
        </div>
        <div
          className="col-span-6 xl:col-span-4 max-xl:max-h-[350px] h-full  p-6 text-white rounded-3xl basis-1/3"
          style={{
            background:
              "linear-gradient(127deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(14, 21, 58, 0.71) 91.2%)",
          }}
        >
          <h2 className="font-bold  text-lg">Payment&apos;s overview</h2>
          <p className="text-gray-300/80 mt-1 flex items-center gap-2">
            <Image src={checkgreen} alt="checkgreen" width={15} height={15} />
            {(stats?.amountstats?.monthAmountPercentageIncrease &&
              `${stats?.amountstats?.monthAmountPercentageIncrease}% this month`) ||
              "N/A"}
          </p>
          <div className="mt-6 ">
            {payments.map((item, index) => {
              return (
                <div className="flex items-start gap-5 mt-4" key={index}>
                  <Image src={cart} alt="cart" width={20} height={20} />
                  <div>
                    <p className="">
                      {item.amount}, {item.plan}
                    </p>
                    <p className="text-sm text-gray-300/80">{item.email}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
