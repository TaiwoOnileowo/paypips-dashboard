import React from "react";
import HomeStats from "./HomeStats";
import RevenueChart from "../Charts/RevenueChart";
import ProfitChart from "../Charts/ProfitChart";
import ClientChart from "../Charts/ClientChart";
import PlanChart from "../Charts/PlanChart";
const EmployeeHome = () => {
  return (
    <div className="h-full">
      <HomeStats />
      <div className="grid grid-cols-12  gap-6 mt-6 ">
        <RevenueChart />
        <ProfitChart />
      </div>
      <div className="grid grid-cols-12  gap-6 mt-6 ">
        <ClientChart />
        <PlanChart />
      </div>
    </div>
  );
};

export default EmployeeHome;
