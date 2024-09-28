import PaymentsTable from "@/components/PaymentsTable";
import PayoutsTable from "@/components/PayoutsTable";
import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
const Page = async () => {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");
  return (
    <div className="p-6 h-full  flex flex-col max-md:gap-6 md:gap-10 items-center">
      <PaymentsTable session={session} />
      <PayoutsTable />
    </div>
  );
};

export default Page;
