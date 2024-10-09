import React from "react";
import logo from "@/public/logo.svg";

import facebook from "@/assets/icons/facebook.svg";
import instagram from "@/assets/icons/instagram.svg";
import twitter from "@/assets/icons/twitter.svg";

import Link from "next/link";
import edit from "@/assets/icons/edit.svg";
import PlansTable from "../../../components/(dashboard)/Profile/PlansTable";
import { verifyToken } from "@/lib/actions/user.actions";
import { auth } from "@/auth";

import { redirect } from "next/navigation";
import Plan from "@/components/(dashboard)/Plan";
import PaymentOverlay from "@/components/(dashboard)/PaymentOverlay";
import SubscriptionAlert from "@/components/(dashboard)/SubscriptionAlert";
const Page = async ({
  searchParams,
}: {
  searchParams: {
    trxref: string;
    reference: string;
  };
}) => {
  const trxRef = searchParams.trxref;
  const ref = searchParams.reference;

  const session = await auth();

  const token = session?.user.token;
  if (typeof token !== "string" || !session) {
    redirect("/sign-in");
  }

  const isTokenValid = await verifyToken(token);
  if (!isTokenValid) {
    redirect("/sign-in");
  }
  // const profileInfo = [
  //   {
  //     title: "Full Name",
  //     value: session.user.name,
  //   },

  //   {
  //     title: "Email",
  //     value: session.user.email,
  //   },
  //   {
  //     title: "Location",
  //     value: "Nigeria",
  //   },
  // ];

  return (
    <div className="[1300px]:p-6 text-white p-4 ">
      {trxRef && ref ? (
        <PaymentOverlay trxRef={trxRef} reference={ref} session={session} />
      ) : null}
      <div
        style={{
          background:
            "linear-gradient(113deg, rgba(6, 11, 40, 0.94) 0%, rgba(10, 14, 35, 0.62) 110.84%)",
        }}
        className="rounded-3xl p-6 flex max-md:flex-col gap-5 justify-between items-center"
      >
        <SubscriptionAlert session={session} />
        <div className="flex max-md:flex-col max-md:gap-6 gap-8 items-center ">
          {/* <div className="w-20 h-20 bg-sharpBlue rounded-3xl flex relative items-center justify-center">
            <Image src={logo} alt="logo" className="w-14 h-14" />
            <div
              className="rounded-md w-6 h-6 absolute -right-0 -bottom-1 cursor-pointer flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(139deg, rgba(6, 11, 40, 0.94) 17.44%, rgba(10, 14, 35, 0.49) 93.55%, rgba(10, 14, 35, 0.69) 93.55%)",
              }}
            >
              <Image src={edit} alt="edit" className="w-4 h-4" />
            </div>
          </div> */}
          <div className="max-md:text-center">
            <h3 className="font-bold text-xl">{session.user.name}</h3>
            <p className="text-gray-400 text-sm font-medium">
              {session.user.email}
            </p>
          </div>
        </div>
        <a href="https://t.me/paypips_adminBot" target="_blank">
          <button className="rounded-2xl px-6 bg-sharpBlue p-3">
            Proceed to Bot
          </button>
        </a>
      </div>
      <div className="grid-cols-12 grid [1300px]:h-[370px] mt-6 gap-6 overflow-hidden">
        <div
          className="max-[1300px]:col-span-12 h-[370px] col-span-6 rounded-3xl p-6"
          style={{
            backgroundImage: "url('/images/profilebg2.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="text-2xl font-bold">Welcome Back!</h1>
          <p className="text-white/90 mt-0.5 text-sm">
            Nice to see you, {session.user.name}
          </p>
        </div>
        <Plan session={session} />

        {/* <div
          className="max-[1300px]:col-span-12 max-md:text-sm h-[370px] col-span-3 p-6 rounded-3xl text-[15px]"
          style={{
            background:
              "linear-gradient(127deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)",
          }}
        >
          <h1 className="text-lg font-bold mb-2">Profile Information</h1>
          {profileInfo.map((info, index) => (
            <p key={index} className="font-medium text-white mt-2">
              <span className="text-gray-400 mr-2 font-normal">
                {info.title}:
              </span>{" "}
              {info.value}
            </p>
          ))}
          <p className="font-medium text-white mt-2 flex gap-2 items-center">
            <span className="text-gray-400  ">Social:</span>
            <span className="flex gap-2">
              {social.map((icon, index) => (
                <Link href={icon.link} target="_blank" key={index}>
                  <Image src={icon.icon} alt={icon.name} className="w-5 h-5" />
                </Link>
              ))}
            </span>
          </p>
        </div> */}
      </div>
      {/* <div className="mt-6">
        <PlansTable />
      </div> */}
    </div>
  );
};

export default Page;
