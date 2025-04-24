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

    return config;
  } catch (error) {
    console.error("Error getting access token:", error);
    return config;
  }
});

// Response Interceptor
axiosClient.interceptors.response.use(
  (res: AxiosResponse) => res.data,
  (error: AxiosError<ApiErrorResponse>) => {
    if (
      error.response &&
      [
        "Invalid email or password.",
        "Email not found.",
        "Email is already in use. Try logging in instead.",
        "Current password is incorrect.",
      ].includes(error.response.data.message)
    ) {
      return Promise.reject(error);
    }

    console.error(
      `Error in axios response:`,
      error.response?.data || error.message,
    );
    return Promise.reject(error);
  },
);

export default axiosClient;
