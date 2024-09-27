import React from "react";
import { redirect } from "next/navigation";
const Page = async () => {
  redirect("/dashboard");
  return <div>Paypips Dashboard</div>;
};

export default Page;
