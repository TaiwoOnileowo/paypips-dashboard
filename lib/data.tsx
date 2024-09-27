import cardwhite from "@/assets/icons/card-white.svg";
import homewhite from "@/assets/icons/home-white.svg";
import chartwhite from "@/assets/icons/chart-white.svg";
import cardblue from "@/assets/icons/card-blue.svg";
import homeblue from "@/assets/icons/home-blue.svg";
import chartblue from "@/assets/icons/chart-blue.svg";
import logoutwhite from "@/assets/icons/logout-white.svg";
import logoutblue from "@/assets/icons/logout-blue.svg";
import profilewhite from "@/assets/icons/profile-white.svg";
import profileblue from "@/assets/icons/profile-blue.svg";
export const sidebar = [
  {
    title: "Home",
    icon: {
      white: homewhite,
      blue: homeblue,
    },
    path: "/dashboard",
  },
  {
    title: "Tables",

    icon: {
      white: chartwhite,
      blue: chartblue,
    },
    path: "/dashboard/tables",
  },
  {
    title: "Billing",
    icon: {
      white: cardwhite,
      blue: cardblue,
    },
    path: "/dashboard/billing",
  },
  {
    title: "Profile",
    icon: {
      white: profilewhite,
      blue: profileblue,
    },
    path: "/dashboard/profile",
  },
  {
    title: "Logout",
    icon: {
      white: logoutwhite,
      blue: logoutblue,
    },
    path: "/dashboard/logout",
  },
];
import doublecheck from "@/assets/icons/double-check.svg";
import cards from "@/assets/icons/cards.svg";
import globe from "@/assets/icons/globe.svg";
import cart from "@/assets/icons/cart-white.svg";
export const homePageStats = [
  {
    sub: "Today's money",
    // value: "$10,000",
    value: "",
    percent: "",
    // percent: "+10%",
    icon: cards,
  },
  {
    sub: "Today's subscription",
    // value: "3,000",
    value: "",
    // percent: "+15%",
    percent: "",
    icon: globe,
  },
  {
    sub: "Active subscription",
    // value: "6000",
    value: "",
    // percent: "-3%",
    percent: "",
    icon: doublecheck,
  },
  {
    sub: "Total sales",
    // value: "$100,000",
    value: "",
    // percent: "+5%",
    percent: "",
    icon: cart,
  },
];

export const payments = [
  {
    amount: "$600",
    email: "onileowo@gmail.com",
    plan: "Signal Monthly",
    method: "Flutterwave",
    date: "06/12/2024",
  },
  {
    amount: "$500",
    email: "boluwatife@gmail.com",
    plan: "Mentorship Group",
    method: "Flutterwave",
    date: "01/02/2024",
  },
  {
    amount: "$1,000",
    email: "dax@gmail.com",
    plan: "Signal Monthly",
    method: "BTC",
    date: "07/02/2024",
  },
  {
    amount: "$100",
    email: "emma@gmail.com",
    plan: "Mentorship Group",
    method: "USDT",
    date: "02/08/2024",
  },
  {
    amount: "$100",
    email: "eba@gmail.com",
    plan: "Mentorship Private",
    method: "USD",
    date: "01/02/2024",
  },
];
export const payouts = [
  {
    beneficiary: "33x234567",
    currency: "USD",
    amount: "$100",
    date: "01/02/2024",
    status: "Pending",
    time: "12:00 AM",
  },
  {
    beneficiary: "33x2343r67",
    currency: "BTC",
    amount: "$200",
    date: "01/05/2024",
    status: "Completed",
    time: "12:40 AM",
  },
  {
    beneficiary: "33x2343r67",
    currency: "BTC",
    amount: "$400",
    date: "01/25/2024",
    status: "Completed",
    time: "12:40 AM",
  },
  {
    beneficiary: "33x2343r67",
    currency: "BTC",
    amount: "$200",
    date: "01/06/2024",
    status: "Pending",
    time: "12:40 AM",
  },
  {
    beneficiary: "33x2343r67",
    currency: "BTC",
    amount: "$200",
    date: "01/15/2024",
    status: "Completed",
    time: "12:40 AM",
  },
  {
    beneficiary: "33x2343r67",
    currency: "BTC",
    amount: "$200",
    date: "01/15/2024",
    status: "Completed",
    time: "12:40 AM",
  },
  {
    beneficiary: "33x3e43r67",
    currency: "USDT",
    amount: "$200",
    date: "01/05/2024",
    status: "Completed",
    time: "12:40 AM",
  },
];
import mastercard from "@/assets/icons/mastercard.svg";
import visa from "@/assets/icons/visa.svg";
import btc from "@/assets/icons/btc.svg";
import usdt from "@/assets/icons/usdt.svg";
import eth from "@/assets/icons/eth.svg";
import flutterwave from "@/assets/icons/flutterwave.png";
export const payMethods = [
  {
    logo: mastercard,
    account: "2345355XXXXXX",
    name: "Mastercard",
  },
  {
    logo: visa,
    account: "234535848XXXXX",
    name: "Visa",
  },
  {
    logo: btc,
    account: "2345333XXXXXX",
    name: "BitCoin",
  },
  {
    logo: usdt,
    account: "2342222XXXXXX",
    name: "USDT",
  },
  // {
  //   logo: eth,
  //   account: "234535223XXXXX",
  //   name: "Ethereum",
  // },
  // {
  //   logo: flutterwave,
  //   account: "2323444XXXXXX",
  //   name: "Flutterwave",
  // },
];

export const accountBalances = [
  {
    name: "Flutterwave",
    amount: "₦100,000",
  },
  {
    name: "BTC",
    amount: "0.005BTC",
  },
  {
    name: "USDT",
    amount: "$100",
  },
  {
    name: "Ethereum",
    amount: "0.0099ETH",
  },
];

export const recentTransactions = [
  {
    name: "Payout to 33x234567",
    amount: "-$100",
    date: "07 September 2024",
    time: "12:00 AM",
  },
  {
    name: "Signal Monthly",
    amount: "+$600",
    date: "07 September 2024",
    time: "2:00 AM",
  },
  {
    name: "Paypips Monthly Subscription",
    amount: "-$149",
    date: "06 September 2024",
    time: "12:00 AM",
  },
  {
    name: "Paypips Transaction fees",
    amount: "-$10",
    date: "06 September 2024",
    time: "4:00 AM",
  },
  {
    name: "Mentorship Group",
    amount: "Pending",
    date: "06 September 2024",
    time: "4:40 AM",
  },
  {
    name: "Mentorship Private",
    amount: "+$100",
    date: "05 September 2024",
    time: "8:40 AM",
  },
];

export const plans = [
  {
    name: "Signal Monthly",
    paymentModel: "Monthly Subscription",
    amount: "$100",
    action: "Edit",
  },

  {
    name: "Signal Lifetime",
    paymentModel: "One Time Payment",
    amount: "$3000",
    action: "Edit",
  },
  {
    name: "Mentorship Group",
    paymentModel: "One Time Payment",
    amount: "$200",
    action: "Edit",
  },
  {
    name: "Mentorship Private",
    paymentModel: "One Time Payment",
    amount: "$500",
    action: "Edit",
  },
];
