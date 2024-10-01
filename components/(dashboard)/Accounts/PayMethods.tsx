"use client";
import React from "react";
import { payMethods } from "@/lib/data/dashboarddata";
import edit from "@/assets/icons/edit.svg";
import Image from "next/image";
import { Session } from "next-auth";
import { Skeleton } from "@/components/ui/skeleton";
import litecoin from "@/assets/icons/litecoin.svg";
import trc from "@/assets/icons/trc.svg";

import solana from "@/assets/icons/solana.svg";
import btc from "@/assets/icons/btc.svg";
import usdt from "@/assets/icons/usdt.svg";
import eth from "@/assets/icons/eth.svg";
import flutterwave from "@/assets/icons/flutterwave.png";
import { useGetAccountDetails } from "@/hooks/reactQueryHooks";

import NotFound from "../NotFound";
import Error from "../Error";
const PayMethods = ({ session }: { session: Session }) => {
  const {
    data: account,
    isLoading,
    isError,
    error,
  } = useGetAccountDetails(session);
  console.log(account, "account");
  const userAddresses = account?.addresses;
  console.log("isLoading", isLoading);
  console.log("isError", isError);
  if (isLoading) {
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
        </div>
        <div className="w-full grid max-md:grid-cols-1 grid-cols-2 gap-2 items-center justify-center mt-4">
          {[1, 2, 3, 4].map((_, index) => (
            <Skeleton
              key={index}
              className="flex w-full mt-4 border-2 font-medium border-white/50 gap-3 items-center justify-between p-4 rounded-3xl h-14"
              style={{
                background:
                  "linear-gradient(117deg, rgba(255, 255, 255, 0.00) -3.91%, rgba(255, 255, 255, 0.04) 75.27%)",
              }}
            />
          ))}
        </div>
      </div>
    );
  }
  if (isError || !userAddresses) {
    console.log(error, "error");
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
        </div>
        <Error message="An error occurred while fetching payment addresses" />
      </div>
    );
  }
  const filledUserAddresses = userAddresses?.filter(
    (address) => address.account !== ""
  );
  const getImage = (name: string) => {
    switch (name) {
      case "LTCT":
        return litecoin;
      case "TRC":
        return trc;
      case "BTC":
        return btc;
      case "SOL":
        return solana;
      case "ERC":
        return eth;
      default:
        return btc;
    }
  };
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
        {/* <button className="bg-sharpBlue rounded-3xl p-3 py-2 text-sm font-medium">
          ADD A NEW CARD
        </button> */}
        {/* TO-BE-IMP */}
      </div>
      {filledUserAddresses.length > 0 ? (
        <div className="w-full grid max-md:grid-cols-1 grid-cols-2 gap-2 items-center justify-center mt-4">
          {filledUserAddresses.map((method, index) => (
            <div
              key={index}
              className="flex w-full mt-4 border-2 font-medium border-white/50 gap-3 items-center justify-between p-4 rounded-3xl"
              style={{
                background:
                  "linear-gradient(117deg, rgba(255, 255, 255, 0.00) -3.91%, rgba(255, 255, 255, 0.04) 75.27%)",
              }}
            >
              <div className="flex gap-2 items-center justify-center">
                <Image
                  src={getImage(method.name)}
                  alt={method.name}
                  className="w-6 h-6"
                />
                <p className="max-w-full truncate max-xl:max-w-[240px]">
                  {method.account}
                </p>
              </div>
              {/* <Image src={edit} alt="edit" className="w-4 h-4 cursor-pointer" /> */}
              {/* TO-BE-IMP */}
            </div>
          ))}
        </div>
      ) : (
        <NotFound message="No payment address found" />
      )}
    </div>
  );
};

export default PayMethods;
