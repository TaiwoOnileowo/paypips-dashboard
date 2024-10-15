import React from "react";
import { FileChartLine, FilePlus } from "lucide-react";
import { Session } from "next-auth";
const EmployeeHeader = ({ session }: { session: Session }) => {
  const firstname = session.user!.name!.split(" ")[0];
  return (
    <div className="p-6 flex justify-between items-center">
      <div>
        <h1 className="text-xl font-bold text-white">
          Welcome back, {firstname ?? ""}
        </h1>
        <p className="text-neutral-400 mt-1 text-sm font-plus">
          SyncGram loves you
        </p>
      </div>
      <div className="flex gap-6 items-center">
        <button className="flex gap-2 items-center bg-card_gradient px-6 p-2 rounded-md text-sm text-white">
          <FileChartLine className="w-5 h-5" />
          Export data
        </button>
        <button className="flex gap-2 items-center bg-brightPurple px-6 p-2 rounded-md text-sm text-white">
          <FilePlus className="w-5 h-5" />
          Create report
        </button>
      </div>
    </div>
  );
};

export default EmployeeHeader;
