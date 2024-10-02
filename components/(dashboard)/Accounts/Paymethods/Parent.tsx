import React from "react";

const Parent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="col-span-4 text-white p-6  h-full rounded-3xl backdrop-blur-[60px] bg-cover bg-no-repeat bg-center bg-paymethod_bg"
      style={{
        background:
          "linear-gradient(127deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)",
      }}
    >
      <div className="flex justify-between w-full items-center">
        <h3 className="font-medium">Payment Addresses</h3>
      </div>
      {/* <button className="bg-sharpBlue rounded-3xl p-3 py-2 text-sm font-medium">
          ADD A NEW CARD
        </button> */}
      {/* TO-BE-IMP */}
      {children}
    </div>
  );
};

export default Parent;
