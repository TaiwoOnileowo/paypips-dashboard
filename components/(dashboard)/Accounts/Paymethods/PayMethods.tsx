"use client";
import React from "react";
import Image from "next/image";
import { Session } from "next-auth";
import { Skeleton } from "@/components/ui/skeleton";
import litecoin from "@/assets/icons/litecoin.svg";
import trc from "@/assets/icons/trc.svg";

import solana from "@/assets/icons/solana.svg";
import btc from "@/assets/icons/btc.svg";

import eth from "@/assets/icons/eth.svg";

import { useGetAccountDetails } from "@/hooks/clientApiHooks";
import NotFound from "../../NotFound";
import Parent from "./Parent";
import Error from "../../Error";
const PayMethods = ({ session }: { session: Session }) => {
  const {
    data: account,
    isLoading,
    isError,
    error,
  } = useGetAccountDetails(session);

  const userAddresses = account?.addresses;

  if (isLoading) {
    return (
      <Parent>
        <div className="w-full gap-2 items-center justify-center mt-4">
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
      </Parent>
    );
  }
  if (isError || !userAddresses) {
    console.log(error, "error");
    return (
      <Parent>
        <Error message="An error occurred while fetching payment addresses" />
      </Parent>
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
    <Parent>
      {filledUserAddresses.length > 0 ? (
        <div className="w-full gap-2 items-center justify-center mt-4">
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
    </Parent>
  );
};

export default PayMethods;
