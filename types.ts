export type AppContextType = {
  showSidebar: boolean;
  setShowSidebar: (showSidebar: boolean) => void;
};
export interface RevenueStats {
  totalRevenue: string;
  todayRevenue: string;
  monthRevenue: string;
  todayRevenuePercentageIncrease: string;
  monthRevenuePercentageIncrease: string;
  totalRevenuePercentageIncrease: string;
}
export interface SubscriptionStats {
  activeSubscriptions: string;
  todaySubscriptions: string;
  todaySubscriptionPercentageIncrease: string;
  activeSubscriptionPercentageIncrease: string;
  withdarawableBalance: string;
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
