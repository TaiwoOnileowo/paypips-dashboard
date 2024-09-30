"use server"
import React from "react";
import { signOut } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
const Page = async () => {
  await signOut();
  redirect("/sign-in");
  return (
    <div className="flex items-center h-screen justify-center">
      <Link
        href={"/sign-in"}
        onClick={async () => {
          "use server";
          await signOut();
        }}
      >
        Logout
      </Link>
    </div>
  );
};

export default Page;
