import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const formatAmountWithSign = (currency: string, amount: string) => {
  switch (currency) {
    case "LTCT":
      return `Ł${amount}`;
    case "USDT.TRC20":
      return `₮${amount}`;
    case "BTC":
      return `₿${amount}`;
    case "NGN":
      return `₦${amount}`;
    // case "SOL":
    //   return "Solana";
    // case "UGX":
    //   return "UGX";
    // case "USDT.ERC20":
    //   return "USDT.ERC20";
    default:
      return amount;
  }
};
export const convertCurrencyToName = (currency: string) => {
  switch (currency) {
    case "LTCT":
      return "LiteCoin";
    case "USDT.TRC20":
      return "USDT.TRC20";
    case "BTC":
      return "Bitcoin";
    case "NGN":
      return "Naira";
    case "SOL":
      return "Solana";
    case "UGX":
      return "UGX";
    case "USDT.ERC20":
      return "USDT.ERC20";
    default:
      return currency;
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
export function formatTo12HourTime(date: Date | null) {
  if (!date) return "";
  // Format the time to 12-hour clock with AM/PM
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return formattedTime;
}
export function formatTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();

  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerWeek = msPerDay * 7;
  const msPerMonth = msPerDay * 30.44; // Approximate average month
  const msPerYear = msPerDay * 365.25; // Account for leap years

  const elapsed = now.getTime() - date.getTime();

  if (elapsed < msPerMinute) {
    return "just now";
  } else if (elapsed < msPerHour) {
    const minutes = Math.round(elapsed / msPerMinute);
    return minutes === 1 ? "a minute ago" : `${minutes} minutes ago`;
  } else if (elapsed < msPerDay) {
    const hours = Math.round(elapsed / msPerHour);
    return hours === 1 ? "an hour ago" : `${hours} hours ago`;
  } else if (elapsed < msPerWeek) {
    const days = Math.round(elapsed / msPerDay);
    if (days === 1) return "yesterday";
    if (days < 7) return `${days} days ago`;
    return "a week ago";
  } else if (elapsed < msPerMonth) {
    const weeks = Math.round(elapsed / msPerWeek);
    if (weeks === 1) return "a week ago";
    return `${weeks} weeks ago`;
  } else if (elapsed < msPerYear) {
    const months = Math.round(elapsed / msPerMonth);
    if (months === 1) return "a month ago";
    return `${months} months ago`;
  } else {
    const years = Math.round(elapsed / msPerYear);
    if (years === 1) return "a year ago";
    return `${years} years ago`;
  }
}
export function formatNumberWithCommas(number: number) {
  return number.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
