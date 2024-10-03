import { FaUsers } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa6";
import { FaChartBar } from "react-icons/fa";
import { FaCogs } from "react-icons/fa";
export const navLinks = [
  {
    name: "About",
    href: "#about",
    // icon:<IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />
  },

  {
    name: "How It Works",
    href: "#how-it-works",
  },
  {
    name: "Features",
    href: "#features",
  },
  {
    name: "Pricing",
    href: "#pricing",
  },
];

export const features = [
  {
    id: 1,
    icon: <FaDollarSign />,
    description:
      "Integrate secure payment gateways to manage subscription payments effortlessly",
  },
  {
    id: 2,
    icon: <FaUsers />,

    description:
      "Easily add, remove, and manage members in your Telegram community with our advanced bot.",
  },
  {
    id: 3,
    icon: <FaChartBar />,
    description:
      "Gain insights into your community's activity and engagement with detailed analytics.",
  },
  {
    id: 4,
    icon: <FaCogs />,
    description:
      "Set custom rules for member access based on their subscription levels",
  },
];
export const moreFeatures = [
  {
    id: 1,
    icon: "Easy Installation",
    description:
      "It takes only 5 minutes to start using Paypips. No coding or technical skills required.",
  },
  {
    id: 2,
    icon: "Access Codes",
    description:
      "With Access Codes you will accept payments manually, but membership management (adding and removing from channels/groups, reminders, etc.) will be automated.",
  },
  {
    id: 3,
    icon: "Card processing",
    description:
      "Accept credit and debit cards with Paystack, Stripe, Paypal and other payment gateways.",
  },
  {
    id: 4,
    icon: "Custom commands",
    description: "Supercharge your membership bot with your own commands.",
  },
  {
    id: 5,
    icon: "Flexible subscription",
    description:
      "From 1 day to an entire lifetime — you can create as many plans as you want.",
  },
  {
    id: 6,
    icon: "Data export (CSV)",
    description:
      "You can export your users, payments and subscriptions data at any time.",
  },
];

export const pricing = [
  {
    id: 1,
    name: "Basic Plan",
    amount: "Free",
    amount_annual: 0,
    transaction_fee: 3,
    benefits: {
      1: "Card, Bank Transfer <br> USDT, BTC, ETH - Crypto Payment options",
      2: "Automatically send an invite link to users after payment",
      3: "Basic analytics to track transactions and payment status",
      4: "Email support",
      5: "3% Transaction fee",
    },
    text: "+ 3% transaction fee",
    ctatext:
      "Perfect for one-off transactions. A use-case would be one time payment for a Mentorship group.",
    button: "Start For Free",
  },
  {
    id: 2,
    name: "Professional Plan",
    amount: "$149",
    amount_annual: 990,
    transaction_fee: 2.5,
    benefits: {
      1: "Every feature in Growth Plan",

      2: "Custom broadcast messages to all subscribers.",
      3: "Access Codes for exclusive content or events.",
      4: "24/7 phone and email support with a dedicated account manager custom setup, e.g Waitlist",
      5: "Priority onboarding and setup assistance.",
      6: "Exclusive Perks: VIP access to beta features and early access to new integrations.",
      7: "Lower transaction fee of 3%",
    },
    benefits_sm: {
      1: " All Free Tier features",
      2: "Full bot Customization to your Brand",
      // 3: "Priority Email Support for members",
      // 4: " Access Codes",
      // 5: "Comprehensive Analytics",
      // 6: "Custom Broadcasts",
      // 7: "Dedicated Account Manager",
      // 8: "Comprehensive Analysis",
      // 9: "24/7 Priority Phone & Email Support",
    },
    text: "+ 3% transaction fee on every $100",
    ctatext:
      "Ideal for established communities. Premium service that ensures smooth operations and enhances your members satisfaction.",
    button: "Get Started",
  },
  {
    id: 3,
    name: "Growth Plan",
    amount:"$0",
    amount_annual: 0,
    transaction_fee: 8,
    benefits: {
      1: "Everything in Basic Plan",
      2: "Automated Group and Subscription Management",
      3: "Automated Renewal Reminders",
      4: "Dashboard Analytics with metrics on user engagement, transaction volumes, and revenue tracking.",
      5: "8% (transaction + Management) fee",
    },
    benefits_sm: {
      1: "Card, Bank Transfer & USDT Crypto Payments",
      2: "Basic Group Management",
      // 3: "Email Support",
      // 4: "Automated Renewal Reminders",
      // 5: "Analytics Dashboard",
    },
    text: "+ Zero fees till $1000 in transactions, then 8% fee",
    ctatext:
      "Tailored for those who need more automation without upfront costs, allowing you to scale first before paying more fees.",
    button: "Start For Free",
  },
 
];

export const choose = [
  {
    id: 1,
    title: "Secure Payment Integrations",
  },
  {
    id: 2,
    title: "Advanced Member Management",
  },
  {
    id: 3,
    title: "Detailed Analytics",
  },
  {
    id: 4,
    title: "Custom Access Rules",
  },
  {
    id: 5,
    title: "Flexible Pricing Options",
  },
  {
    id: 6,
    title: "User Friendly",
  },
  {
    id: 7,
    title: "Enhanced Security ",
  },
  {
    id: 8,
    title: "Built-in Affiliate Program",
  },
];

export const faqs = [
  {
    id: 1,
    question: "What is PayPips?",
    answer:
      "PayPips is a membership management platform that helps you monetize your Telegram community. You can create a subscription-based community, manage members, and accept payments securely.",
  },
  {
    id: 2,
    question: "How does PayPips work?",
    answer:
      "PayPips integrates with your Telegram community and payment gateways to manage members and accept payments. You can set custom access rules, create subscription plans, and gain insights into your community's activity.",
  },
  {
    id: 3,
    question: "What payment gateways does PayPips support?",
    answer:
      "PayPips supports popular payment gateways like Stripe, Paystack. You can easily integrate these payment gateways to accept payments from your members securely.",
  },
  {
    id: 4,
    question: "How can I get started with PayPips?",
    answer:
      "You can get started with PayPips by signing up on our website and creating your membership community. You can set up subscription plans, add members, and start accepting payments in minutes.",
  },
  // {
  //   id: 5,
  //   question: "Can I customize the subscription plans on PayPips?",
  //   answer:
  //     "Yes, you can customize the subscription plans on PayPips based on your requirements. You can set the pricing, benefits, and access rules for each plan to offer a personalized experience to your members.",
  // },
  {
    id: 5,
    question: "Is PayPips secure?",
    answer:
      "Yes, PayPips is secure and complies with industry standards for data protection and security. We use encryption and other security measures to protect your data and ensure a safe payment experience for your members.",
  },
  // {
  //   id: 7,
  //   question: "Can I track the performance of my community on PayPips?",
  //   answer:
  //     "Yes, you can track the performance of your community on PayPips with detailed analytics. You can monitor member activity, engagement, and revenue to make informed decisions and optimize your community's growth.",
  // },
  // {
  //   id: 8,
  //   question: "Does PayPips offer customer support?",
  //   answer:
  //     "Yes, PayPips offers customer support to help you with any questions or issues you may have. You can reach out to our support team via email or chat for assistance with your membership community.",
  // },
];

export const footer = [
  {
    id: "1",
    text: "Home",
    link: "/",
  },
  {
    id: "5",
    text: "About",
    link: "#about",
  },
  {
    id: "3",
    text: "How",
    link: "#how-it-works",
  },
  {
    id: "4",
    text: "Features",
    link: "#features",
  },
  {
    id: "2",
    text: "Pricing",
    link: "#pricing",
  },
];
