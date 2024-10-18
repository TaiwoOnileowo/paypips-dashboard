import React from "react";
import HomeStats from "./HomeStats";
import RevenueChart from "../Charts/RevenueChart";
import ProfitChart from "../Charts/ProfitChart";
import ClientChart from "../Charts/ClientChart";
import PlanChart from "../Charts/PlanChart";
import { Session } from "next-auth";
import ExpensesTable from "../Tables/ExpensesTable";
import AmountProcessedChart from "../Charts/AmountProcessedChart";
const EmployeeHome = ({ session }: { session: Session }) => {
  return (
    <div className="h-full">
      <HomeStats session={session} />
      <AmountProcessedChart session={session} />
      <div className="grid grid-cols-12  gap-6 mt-6 ">
        <RevenueChart session={session} />
        <ProfitChart />
      </div>
      <ExpensesTable />
      <div className="grid grid-cols-12  gap-6 mt-6 ">
        <ClientChart session={session} />
        <PlanChart session={session}/>
      </div>
    </div>
  );
};

export default EmployeeHome;
