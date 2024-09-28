"use server";
import { Stats } from "@/types";
import { Session } from "next-auth";
import { Payment } from "@/types";
const baseurl = process.env.API_BASE_URL;
export const getStats = async (session: Session | null) => {
  try {
    const userId = session?.user?.id;
    const token = session?.user?.token;
    const response = await fetch(`${baseurl}/stats?userId=${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data: { stats: Stats } = await response.json();
    return data.stats;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getRecentPayments = async (session: Session | null) => {
  try {
    const userId = session?.user?.id;
    const token = session?.user?.token;
    const response = await fetch(
      `${baseurl}/payments?userId=${userId}&recent=true`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data: { payments: Payment[] } = await response.json();
    return data.payments;
  } catch (error) {
    console.log(error);
    return null;
  }
};
