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
    value: "$10,000",
    percent: "+10%",
    icon: cards,
  },
  {
    sub: "Today's subscription",
    value: "3,000",
    percent: "+15%",
    icon: globe,
  },
  {
    sub: "Active subscription",
    value: "6000",
    percent: "-3%",
    icon: doublecheck,
  },
  {
    sub: "Total sales",
    value: "$100,000",
    percent: "+5%",
    icon: cart,
  },
];
