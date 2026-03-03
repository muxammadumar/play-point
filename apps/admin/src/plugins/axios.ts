import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";
import { ElMessage } from "element-plus";
import { useAuthStore } from "@/store/auth";
import { useSettingsStore } from "@/store/settings";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API || "https://api.example.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const authStore = useAuthStore();
    const settingsStore = useSettingsStore();
    const token = authStore.token || Cookies.get("akfaadmin_access_token");
    const language = settingsStore.locale || Cookies.get("akfaadmin_language");

    config.headers.set("Authorization", `Bearer ${token}`);

    config.headers.set("Accept-Language", language);

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;

      switch (status) {
        case 401:
          ElMessage.error("Unauthorized: Please log in again.");
          break;
        case 403:
          ElMessage.warning("Forbidden: You don’t have permission.");
          break;
        case 404:
          ElMessage.warning("Not Found: Resource is unavailable.");
          break;
        case 500:
          ElMessage.error("Server error: Try again later.");
          break;
        default:
          ElMessage.error(
            (error.response.data as any)?.message || "Unexpected error."
          );
      }
    } else if (error.request) {
      ElMessage.error("No response from server. Check your network.");
    } else {
      ElMessage.error(`Request error: ${error.message}`);
    }

    return Promise.reject(error);
  }
);

export default api;
