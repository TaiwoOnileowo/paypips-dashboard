import Sidebar from "@/components/(dashboard)/Sidebar";
import React from "react";
import type { Metadata } from "next";
import Header from "@/components/(dashboard)/Header";
export const metadata: Metadata = {
  title: "Dashboard | Paypips",
  description: "The future of forex group management",
};
const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="w-full max-h-screen  bg-gradient1 overflow-hidden xl:grid xl:grid-cols-12 ">
      <Sidebar />
      <div className="xl:col-span-10 w-full h-screen relative z-[1] overflow-auto bg-gradient_bg bg-cover bg-left-top md:bg-top  bg-no-repeat">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Layout;
