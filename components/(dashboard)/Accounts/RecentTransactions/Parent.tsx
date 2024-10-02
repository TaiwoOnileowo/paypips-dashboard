import React from "react";

const Parent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      className="max-md:col-span-12 col-span-5 text-white p-6 min-h-[520px] rounded-3xl backdrop-blur-[60px] bg-cover bg-no-repeat bg-center bg-paymethod_bg"
      style={{
        background:
          "linear-gradient(127deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)",
      }}
    >
      <div className="flex max-md:flex-col justify-between w-full items-center">
        <h3 className="font-medium text-lg">Recent Transactions</h3>
      </div>
      {children}
    </div>
  );
};

export default Parent;
