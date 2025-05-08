import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import queryString from "query-string";
import { ApiErrorResponse } from "../types/errorTypes";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  paramsSerializer: (params) => queryString.stringify(params),
});

// Request Interceptor
axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  try {
    const auth = localStorage.getItem("auth");
    let accessToken: string | null = null;

    if (auth) {
      accessToken = JSON.parse(auth)?.access_token;
    }

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    config.headers.Accept = "application/json";
    config.withCredentials = true;

    return config;
  } catch (error) {
    console.error("Error getting access token:", error);
    return config;
  }
});

// Response Interceptor
axiosClient.interceptors.response.use(
  (res: AxiosResponse) => {
    if (typeof res.data === "string" && res.data.includes("<!DOCTYPE html>")) {
      console.error("Ngrok returned HTML instead of JSON");
      return Promise.reject(new Error("Invalid response format"));
    }
    return res.data;
  },
  (error: AxiosError<ApiErrorResponse>) => Promise.reject(error),
);

export default axiosClient;
