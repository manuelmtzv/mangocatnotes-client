import axios, { Axios, AxiosError } from "axios";
import { useToast } from "vue-toast-notification";

export const mangocatnotesApi: Axios = axios.create({
  baseURL: import.meta.env.VITE_MANGOCATAPI_URL,
  withCredentials: true,
});

mangocatnotesApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (err: AxiosError) => {
    if (err.code == AxiosError.ERR_NETWORK)
      useToast().open({
        message: "Server is currently unavailable. Please try again later.",
        type: "error",
        duration: 3500,
      });

    return Promise.reject(err);
  },
);
