import {
  useQuery,
  useMutation,
  MutationOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { Session } from "next-auth";
import http from "../lib/http";
import { CompanyClients, CompanyRevenue } from "@/types";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

//   Queries

export const useGetClients = (session: Session | null) => {
  return useQuery<CompanyClients>({
    queryKey: ["company-clients"],
    queryFn: async () => {
      try {
        const id = session?.user?.id;

        const token = session?.user?.token;
        const response = await http.get(`${baseURL}/company/clients?id=${id}`, {
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

export const useGetRevenue = (session: Session | null) => {
  return useQuery<CompanyRevenue>({
    queryKey: ["company-revenue"],
    queryFn: async () => {
      try {
        const id = session?.user?.id;

        const token = session?.user?.token;
        const response = await http.get(`${baseURL}/company/revenue?id=${id}`, {
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
