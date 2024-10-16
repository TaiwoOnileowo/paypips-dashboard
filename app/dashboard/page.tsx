import React from "react";

import { auth } from "@/auth";

import { redirect } from "next/navigation";

import { verifyToken } from "@/lib/actions/user.actions";

import ClientHome from "./ClientHome";
import EmployeeHome from "@/components/(dashboard)/Employee/EmployeeHome";
const Page = async () => {
  const session = await auth();

  const token = session?.user.token;
  const role = session?.user.role;
  if (typeof token !== "string" || !session) {
    redirect("/sign-in");
  }

  const isTokenValid = await verifyToken(token);
  if (!isTokenValid) {
    redirect("/sign-in");
  }
  const isClient = role === "client";
  return (
    <div className="p-6 ">
      {/* <ClientHome session={session} /> */}
      {isClient ? (
        <ClientHome session={session} />
      ) : (
        <EmployeeHome session={session} />
      )}
    </div>
  );
};

export default Page;
