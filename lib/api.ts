// lib/api.ts (or utils/api.ts)
import axios, { AxiosRequestConfig } from "axios";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const Http = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_APP_SERVER_PROTOCOL}://${process.env.NEXT_PUBLIC_APP_SERVER_URL}`,
  headers: {
    "Content-Type": "application/json",
    ...(API_KEY ? { Authorization: `Apikey ${API_KEY}` } : {}),
  },
  timeout: 30000,
  proxy: false,
});

export const GetApi = async <T = unknown>(
  endpoint: string,
  params?: Record<string, string | boolean | number>
): Promise<T> => {
  try {
    const res = await Http.get<T>(endpoint, { params });

    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching Get data:", error.message);
    } else if (error instanceof Error) {
      console.error("Error fetching Get data:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export const PostApi = async <T = unknown, T2 = unknown>(
  endpoint: string,
  data: T2,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const res = await Http.post<T>(endpoint, data, config);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching Post data:", error.message);
    } else if (error instanceof Error) {
      console.error("Error fetching Post data:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};


export type AboutHeroSectionProps = {
  title: string;
  description: string;
};
