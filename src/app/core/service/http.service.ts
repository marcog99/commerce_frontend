import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { SnackbarEvents } from "../utils/snackbar-events";


export const API_URL = process.env.REACT_APP_BACKEND_URL

const instance = axios.create({
  baseURL: API_URL,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

//if not exist token logout
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
    }
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unexpected server error occurred.";
    SnackbarEvents.emit({ message, type: "error" });

    return Promise.reject(error);
  }
);

const http = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await instance.get(url, config);
    return response.data;
  },

  post: async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
    successMessage?: string
  ): Promise<T> => {
    const isFormData = data instanceof FormData;

    const finalConfig: AxiosRequestConfig = {
      ...config,
      headers: {
        ...(config?.headers || {}),
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
      },
    };

    const payload = isFormData ? data : JSON.stringify(data);
    const response: AxiosResponse<T> = await instance.post(
      url,
      payload,
      finalConfig
    );
    if (successMessage)
      SnackbarEvents.emit({ message: successMessage, type: "success" });

    return response.data;
  },

  put: async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
    successMessage?: string
  ): Promise<T> => {
    const isFormData = data instanceof FormData;

    const finalConfig: AxiosRequestConfig = {
      ...config,
      headers: {
        ...(config?.headers || {}),
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
      },
    };

    const payload = isFormData ? data : JSON.stringify(data);
    const response: AxiosResponse<T> = await instance.put(
      url,
      payload,
      finalConfig
    );
    if (successMessage)
      SnackbarEvents.emit({ message: successMessage, type: "success" });
    return response.data;
  },

  delete: async <T>(
    url: string,
    config?: AxiosRequestConfig,
    successMessage?: string
  ): Promise<T> => {
    const response: AxiosResponse<T> = await instance.delete(url, config);
    if (successMessage)
      SnackbarEvents.emit({ message: successMessage, type: "success" });

    return response.data;
  },
};

export default http;
