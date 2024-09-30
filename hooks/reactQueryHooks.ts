import {
  useQuery,
  useMutation,
  MutationOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { Session } from "next-auth";
import http from "../lib/http";
import {
  AccountDetail,
  Payment,
  Payout,
  RevenueStats,
  SubscriptionStats,
} from "@/types";
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
// Queries
export const useGetRevenueStats = (session: Session | null) => {
  console.log(session, "session");
  return useQuery<RevenueStats>({
    queryKey: ["revenue-stats"],
    queryFn: async () => {
      try {
        const userId = session?.user?.id;
        const token = session?.user?.token;
        const response = await http.get(`${baseURL}/revenue?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        throw new Error(`An error occurred: ${error}`);
      }
    },
  });
};
export const useGetSubscriptionStats = (session: Session | null) => {
  return useQuery<SubscriptionStats>({
    queryKey: ["subscription-stats"],
    queryFn: async () => {
      try {
        const userId = session?.user?.id;
        const token = session?.user?.token;
        const response = await http.get(
          `${baseURL}/subscriptions?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        throw new Error(`An error occurred: ${error}`);
      }
    },
  });
};
export const useGetRecentPayments = (session: Session | null) => {
  return useQuery<Payment[]>({
    queryKey: ["payments"],
    queryFn: async () => {
      try {
        const userId = session?.user?.id;
        const token = session?.user?.token;
        const response = await http.get(
          `${baseURL}/payments?userId=${userId}&recent=true`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data.payments;
      } catch (error) {
        throw new Error(`An error occurred: ${error}`);
      }
    },
  });
};

export const useGetRecentPayouts = (session: Session | null) => {
  return useQuery<Payout[]>({
    queryKey: ["payouts"],
    queryFn: async () => {
      try {
        const userId = session?.user?.id;
        const token = session?.user?.token;
        const response = await http.get(
          `${baseURL}/payouts?userId=${userId}&recent=true`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data.payouts;
      } catch (error) {
        throw new Error(`An error occurred: ${error}`);
      }
    },
  });
};

export const useGetAccountDetails = (session: Session | null) => {
  return useQuery<AccountDetail>({
    queryKey: ["account"],
    queryFn: async () => {
      try {
        const userId = session?.user?.id;
        const token = session?.user?.token;
        const response = await http.get(`${baseURL}/account?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        throw new Error(`An error occurred: ${error}`);
      }
    },
  });
};

export const useGetTransactions = (session: Session | null) => {
  return useQuery<Payment[] | Payout[]>({
    queryKey: ["transactions"],
    queryFn: async () => {
      try {
        const userId = session?.user?.id;
        const token = session?.user?.token;
        const response = await http.get(
          `${baseURL}/transactions?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        throw new Error(`An error occurred: ${error}`);
      }
    },
  });
};
