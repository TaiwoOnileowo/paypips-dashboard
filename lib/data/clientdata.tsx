import {
  IconHomeFilled,
  IconChartColumn,
  IconCreditCardFilled,
  IconUserFilled,
} from "@tabler/icons-react";
export const clientsidebar = [
  {
    title: "Home",
    icon: <IconHomeFilled className="w-5 h-5" />,
    path: "/dashboard",
  },
  {
    title: "Transactions",

    icon: <IconChartColumn className="w-5 h-5" />,
    path: "/dashboard/transactions",
  },
  {
    title: "Accounts",
    icon: <IconCreditCardFilled className="w-5 h-5" />,
    path: "/dashboard/accounts",
  },
  {
    title: "Profile",
    icon: <IconUserFilled className="w-5 h-5" />,
    path: "/dashboard/profile",
  },
];

import doublecheck from "@/assets/icons/double-check.svg";
import cards from "@/assets/icons/cards.svg";
import globe from "@/assets/icons/globe.svg";
import cart from "@/assets/icons/cart-white.svg";
export const homePageStats = [
  {
    sub: "Today's revenue",

    value: "",
    percent: "",

    icon: cards,
  },
  {
    sub: "Today's subscription",

    value: "",
    percent: "",
    icon: globe,
  },
  {
    sub: "Active subscription",

    value: "",

    percent: "",
    icon: doublecheck,
  },
  {
    sub: "Total revenue",

    value: "",

    percent: "",
    icon: cart,
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
