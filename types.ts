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
export interface Stats {
  amountstats: AmountStats;
  subscriptionstats: SubscriptionStats;
}
