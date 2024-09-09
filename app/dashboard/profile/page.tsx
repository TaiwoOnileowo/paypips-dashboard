import React from "react";
import logo from "@/public/logo.svg";
import Image from "next/image";
import facebook from "@/assets/icons/facebook.svg";
import instagram from "@/assets/icons/instagram.svg";
import twitter from "@/assets/icons/twitter.svg";
import slash from "@/assets/icons/slash1.svg";
import Link from "next/link";
import edit from "@/assets/icons/edit.svg";
import PlansTable from "../../../components/Profile/PlansTable";

const Page = () => {
  const profileInfo = [
    {
      title: "Full Name",
      value: "Onileowo Taiwo",
    },
    {
      title: "Mobile",
      value: "09138281054",
    },
    {
      title: "Email",
      value: "taiwoonileowo17@gmail.com",
    },
    {
      title: "Location",
      value: "Nigeria",
    },
  ];
  const social = [
    {
      name: "Facebook",
      link: "https://facebook.com",
      icon: facebook,
    },
    {
      name: "Twitter",
      link: "https://twitter.com",
      icon: twitter,
    },
    {
      name: "Instagram",
      link: "https://www.instagram.com/_sparksitestudios/",
      icon: instagram,
    },
  ];
  return (
    <div className="[1300px]:p-6 text-white p-4 ">
      <div
        style={{
          background:
            "linear-gradient(113deg, rgba(6, 11, 40, 0.94) 0%, rgba(10, 14, 35, 0.62) 110.84%)",
        }}
        className="rounded-3xl p-6 flex max-md:flex-col gap-5 justify-between items-center"
      >
        <div className="flex max-md:flex-col max-md:gap-6 gap-8 items-center ">
          <div className="w-20 h-20 bg-sharpBlue rounded-3xl flex relative items-center justify-center">
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
          </div>
          <div className="max-md:text-center">
            <h3 className="font-bold text-xl">Onileowo Taiwo</h3>
            <p className="text-gray-400 text-sm font-medium">
              taiwoonileowo17@gmail.com
            </p>
          </div>
        </div>
        <button className="rounded-2xl px-6 bg-sharpBlue p-3">
          Proceed to Bot
        </button>
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
            Nice to see you, Onileowo Taiwo
          </p>
        </div>
        <div
          className="max-[1300px]:col-span-12 max-md:text-sm h-[370px] col-span-6 p-6 rounded-3xl text-[15px]"
          style={{
            background:
              "linear-gradient(127deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)",
          }}
        >
          <h1 className="text-lg font-bold">Profile Information</h1>
          <p className="text-gray-400  mt-4 ">
            Hi, I’m Taiwo Onileowo, the Frontend Developer, who is working on
            this dashboard. I work for Paypips Bot, which is a high class forex
            telegram group management bot.
          </p>

          <Image src={slash} alt="slash" className="my-5 w-full" />

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
        </div>
      </div>
      <div className="mt-6">
        <PlansTable />
      </div>
    </div>
  );
};

export default Page;
