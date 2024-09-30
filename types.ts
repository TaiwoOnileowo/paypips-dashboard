export type AppContextType = {
  showSidebar: boolean;
  setShowSidebar: (showSidebar: boolean) => void;
};
interface AmountStats {
  totalAmount: string;
  todayAmount: string;
  monthAmount: string;
  todayAmountPercentageIncrease: string;
  monthAmountPercentageIncrease: string;
  totalAmountPercentageIncrease: string;
}
interface SubscriptionStats {
  activeSubscriptions: string;
  todaySubscriptions: string;
  todaySubscriptionPercentageIncrease: string;
  activeSubscriptionPercentageIncrease: string;
}
interface TransactionStats {
  newest: Payment | Payout;
}
export interface Stats {
  amountstats: AmountStats;
  subscriptionstats: SubscriptionStats;
  transactionstats: TransactionStats;
}
export interface Payment {
  id: string;
  amount: string;
  plan: string;
  method: string;
  date: string;
  email: string;
  isPayout?: boolean;
  time: string;
  created_at: string;
}

export interface Payout {
  beneficiary: string;
  currency: string;
  amount: string;
  date: string;
  status: string;
  time: string;
  isPayout?: boolean;
  created_at: string;
}

export interface AccountDetail {
  addresses: {
    account: string;
    name: string;
  }[];
}
