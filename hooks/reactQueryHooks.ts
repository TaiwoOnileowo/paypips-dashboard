import {
  useQuery,
  useMutation,
  MutationOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { Session } from "next-auth";
import http from "../lib/http";
import { Payment } from "@/types";
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
// Queries
export const useGetStats = (session: Session | null) => {
  console.log(session, "session");
  return useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      try {
        const userId = session?.user?.id;
        const token = session?.user?.token;
        const response = await http.get(`${baseURL}/stats?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response, "querydata");
        return response.data.stats;
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
