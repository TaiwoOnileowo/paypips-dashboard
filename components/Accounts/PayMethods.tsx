import React from "react";
import { payMethods } from "@/lib/data";
import edit from "@/assets/icons/edit.svg";
import Image from "next/image";
const PayMethods = () => {
  return (
    <div
      className="col-span-2 text-white p-6  rounded-3xl backdrop-blur-[60px] bg-cover bg-no-repeat bg-center bg-paymethod_bg"
      style={{
        background:
          "linear-gradient(127deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)",
      }}
    >
      <div className="flex justify-between w-full items-center">
        <h3 className="font-medium">Payment Addresses</h3>
        <button className="bg-sharpBlue rounded-3xl p-3 py-2 text-sm font-medium">
          ADD A NEW CARD
        </button>
      </div>
      <div className="w-full grid max-md:grid-cols-1 grid-cols-2 gap-2 items-center justify-center mt-4">
        {payMethods.map((method, index) => (
          <div
            key={index}
            className="flex w-full mt-4 border-2 font-medium border-white/50 gap-3 items-center justify-between p-4 rounded-3xl"
            style={{
              background:
                "linear-gradient(117deg, rgba(255, 255, 255, 0.00) -3.91%, rgba(255, 255, 255, 0.04) 75.27%)",
            }}
          >
            <div className="flex gap-4 items-center justify-center">
              <Image src={method.logo} alt={method.name} className="w-6 h-6" />
              <p>{method.account}</p>
            </div>
            <Image src={edit} alt="edit" className="w-4 h-4 cursor-pointer" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PayMethods;
