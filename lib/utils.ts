import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const convertCurrency = (currency: string, amount: number) => {
  switch (currency) {
    case "LTCT":
      return amount * 69.6;
    case "USDT.TRC20":
      return amount * 1.08;
    case "BTC":
      return amount * 65479.6;
    case "NGN":
      return amount * 0.0006;
    default:
      return amount;
  }
};
