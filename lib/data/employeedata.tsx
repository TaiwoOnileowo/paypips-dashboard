import { IconHomeFilled, IconChartColumn } from "@tabler/icons-react";
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
import { CircleDollarSign, CreditCard, DollarSign, Users } from "lucide-react";
export const employeeStats = [
  {
    title: "Total Amount Processed",
    // value: "$240.8k",
    value: "N/A",
    percent: "",
    icon: <CircleDollarSign className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Total Income",
    value: "N/A",
    percent: "",
    icon: <CreditCard className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Total expenses",
    value: "$0",
    percent: "+0% from last month",
    icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Active Clients",
    value: "N/A",
    percent: "",
    icon: <Users className="h-4 w-4 text-muted-foreground" />,
  },
];
const categories = [
  "Software",
  "Marketing",
  "Other",
  "Salary",
  "Services",
  "Charges",
  "Social",
];
export const expenses = [
  {
    vendor: "Heroku",
    amount: "$100",
    category: "Software",
    date: "01/02/2024",
    description: "Heroku Subscription",
  },
  {
    vendor: "Twitter",
    amount: "$200",
    category: "Social",
    date: "01/05/2024",
    description: "Twitter Subscription",
  },
  {
    vendor: "Salary",
    amount: "$300",
    category: "Salary",
    date: "01/15/2024",
    description: "SyncGram Salary Payment",
  },
  {
    vendor: "Zoho",
    amount: "$400",
    category: "Marketing",
    date: "01/15/2024",
    description: "Zoho Subscription",
  },
  {
    vendor: "Business Registration",
    amount: "$500",
    category: "Other",
    date: "01/15/2024",
    description: "SyncGram Business Registration",
  },
];
