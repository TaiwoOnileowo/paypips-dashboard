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
export function formatDate(dateString: Date | string | null) {
  if (!dateString) return "";
  const date = new Date(dateString);

  // Extract day, month, and year
  const day = String(date.getDate()).padStart(2, "0"); // Ensure 2-digit day
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure 2-digit month (January is 0)
  const year = date.getFullYear();

  // Return the formatted date
  return `${day}/${month}/${year}`;
}
