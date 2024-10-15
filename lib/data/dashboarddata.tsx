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
export const employeesidebar = [
  {
    title: "Home",
    icon: <IconHomeFilled className="w-5 h-5" />,
    path: "/dashboard",
  },
  {
    title: "Tables",
    icon: <IconChartColumn className="w-5 h-5" />,
    path: "/dashboard/tables",
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
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-react";
export const employeeStats = [
  {
    title: "Total Transactions",
    value: "$45,231.89",
    percent: "+20.1% from last month",
    icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Total expenses",
    value: "$45,231.89",
    percent: "-180.1% from last month",
    icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Total Income",
    value: "$45,231.89",
    percent: "+19% from last month",
    icon: <CreditCard className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Active Clients",
    value: "+573",
    percent: "+201 since last month",
    icon: <Users className="h-4 w-4 text-muted-foreground" />,
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
  {
    name: "Ethereum",
    amount: "0.0099ETH",
  },
  {
    name: "Ethereum",
    amount: "0.0099ETH",
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
