import { Stats } from "@/types";
import { Session } from "next-auth";
const baseurl = process.env.API_BASE_URL;
export const getStats = async (session: Session | null) => {
  try {
    const userId = session?.user?.id;
    const token = session?.user?.token.jti;
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
