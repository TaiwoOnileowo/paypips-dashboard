import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatNumberWithK(num: number) {
  // Check if number is less than 1000
  if (num < 1000) return num.toString();

  // Format for numbers in thousands (k)
  if (num >= 1000 && num < 1000000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }

  // Format for numbers in millions (m)
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "m";
  }

  return num.toString();
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
export const groupDataByDate = (
  data: {
    amount: number;
    created_at: Date | null;
  }[],
  dateFormat: string
) => {
  const groupedData = data.reduce(
    (
      acc: { [date: string]: { date: string; amount: number } },
      { amount, created_at }
    ) => {
      const date = formatDate(created_at, dateFormat);
      // Check if the date already exists in the accumulator
      if (!acc[date]) {
        // If not, create a new entry
        acc[date] = { date, amount: 0 };
      }

      acc[date].amount += amount;

      return acc;
    },
    {}
  );
  return groupedData;
};
export const groupData = (
  data: { item: string | null; value: number | null }[]
) => {
  const groupedData = data.reduce(
    (
      acc: { [item: string]: { item: string; value: number } },
      { item, value }
    ) => {
      if (item && !acc[item]) {
        acc[item] = { item, value: 0 };
      }
      acc[item ? item : 0].value += 1;
      return acc;
    },
    {}
  );
  return groupedData;
};
export const groupDataByMonth = (
  data: {
    sub_plan_name: string | null;
    status: string | null;
    start_date: Date | null;
  }[]
) => {
  // Group subscriptions by plan name and month
  const groupedData: { [plan: string]: any } = {};

  data.forEach(({ sub_plan_name, status, start_date }) => {
    if (!sub_plan_name || !status) return;

    const monthYear = `${start_date?.getFullYear()}-${
      start_date && start_date.getMonth() + 1
    }`;

    if (!groupedData[sub_plan_name]) {
      groupedData[sub_plan_name] = {
        currentMonthValue: 0,
        previousMonthValue: 0,
      };
    }

    if (status.toLowerCase() !== "pending") {
      // Assume you're checking for the current month
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      const currentMonthYear = `${currentYear}-${currentMonth}`;

      if (monthYear === currentMonthYear) {
        groupedData[sub_plan_name].currentMonthValue += 1;
      } else {
        groupedData[sub_plan_name].previousMonthValue += 1;
      }
    }
  });

  return Object.keys(groupedData).map((plan) => ({
    plan,
    ...groupedData[plan],
  }));
};

export function formatDate(dateString: Date | string | null, format: string) {
  if (!dateString) return "";
  return dayjs(dateString).format(format);
}

export function formatTo12HourTime(date: Date | string | null) {
  if (!date) return "";
  return dayjs(date).format("h:mm A");
}

export function formatTimeAgo(dateString: string) {
  if (!dateString) return "";
  return dayjs(dateString).fromNow();
}
export function formatNumberWithCommas(number: number) {
  return number.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
