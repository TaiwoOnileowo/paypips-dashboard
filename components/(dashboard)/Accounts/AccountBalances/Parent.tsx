import React from "react";

const Parent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="col-span-1 text-white p-6 h-[240px] rounded-3xl backdrop-blur-[60px] bg-cover bg-no-repeat bg-center bg-paymethod_bg"
      style={{
        background:
          "linear-gradient(127deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)",
      }}
    >
      <h3 className="font-medium text-lg">Account Balances</h3>
      {children}
    </div>
  );
};

export default Parent;
