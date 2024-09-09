import PaymentsTable from "@/components/PaymentsTable";
import PayoutsTable from "@/components/PayoutsTable";
import React from "react";

const Page = () => {
  return (
    <div className="p-6 h-full  flex flex-col max-md:gap-6 md:gap-10 items-center">
      <PaymentsTable />
      <PayoutsTable />
    </div>
  );
};

export default Page;
