import axios from "axios";

import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3 * 60 * 1000,
      gcTime: 5 * 60 * 1000,
    },
  },
});

export const baseURL = process.env.API_BASE_URL;

const http = axios.create({
  baseURL,
});

// Add an interceptor to include the authorization token and API key in each request
// http.interceptors.request.use(async (config) => {
//   const session = await auth();
//   const token = session?.user?.token;
//   console.log(token, "http");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

export default http;
