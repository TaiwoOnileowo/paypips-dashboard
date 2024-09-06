import Sidebar from "@/components/Sidebar";
import React from "react";
import Header from "@/components/Header";
import Image from "next/image";
const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="w-full h-screen overflow-y-auto bg-gradient1 overflow-hidden xl:grid xl:grid-cols-12 ">
      <Sidebar />

      <div className="xl:col-span-10 w-full h-full relative z-[1]">
        <Image
          src="/images/background.png"
          alt="background"
          className="w-full h-full absolute -bottom-0 left-0 max-xl:hidden z-[-1] opacity-50"
          width={1920}
          height={1080}
        />

        <Header />
        {children}
      </div>
    </div>
  );
};

export default Layout;
