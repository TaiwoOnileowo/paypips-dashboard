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
  Balance,
  Pagination,
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
export const useGetPayments = ({
  session,
  page,
  limit,
  query,
}: {
  session: Session;
  page: number;
  limit: number;
  query?: string;
}) => {
  return useQuery<{
    payments: Payment[];
    pagination: Pagination;
  }>({
    queryKey: [
      "payments",
      (query !== "" || query !== undefined) && query,
      page,
    ],
    queryFn: async () => {
      try {
        const userId = session?.user?.id;
        const token = session?.user?.token;
        const response = await http.get(
          `${baseURL}/payments?userId=${userId}&page=${page}&limit=${limit}&search=${query}`,
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

export const useGetPayouts = ({
  session,
  page,
  limit,
  query,
}: {
  session: Session;
  page: number;
  limit: number;
  query?: string;
}) => {
  return useQuery<{
    payouts: Payout[];
    pagination: Pagination;
  }>({
    queryKey: ["payouts", (query !== "" || query !== undefined) && query, page],
    queryFn: async () => {
      try {
        const userId = session?.user?.id;
        const token = session?.user?.token;
        const response = await http.get(
          `${baseURL}/payouts?userId=${userId}&page=${page}&limit=${limit}&search=${query}`,
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
export const useVerifyPayment = (ref: string, userId: string) => {
  return useQuery({
    queryKey: ["verify-payment"],
    queryFn: async () => {
      try {
        const response = await http.get(
          `${baseURL}/pay-verify?ref=${ref}&userId=${userId}`
        );
        return response.data;
      } catch (error) {
        throw new Error(`An error occurred: ${error}`);
      }
    },
  });
};

// Mutations
export const useMakePayment = (
  payload: MutationOptions<
    {
      authorization_url: string;
    },
    unknown,
    string
  >
) => {
  const { onSuccess, ...options } = payload;

  return useMutation<
    {
      authorization_url: string;
    },
    unknown,
    string
  >({
    mutationFn: async (email) => {
      try {
        const response = await http.post(
          `${baseURL}/pay-initialize`,
          JSON.stringify({
            email,
          })
        );
        console.log(response.data);
        return response.data;
      } catch (error) {
        throw new Error(`An error occurred: ${error}`);
      }
    },
    onSuccess,
    ...options,
  });
};
