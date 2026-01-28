import axios, { type CreateAxiosDefaults } from "axios";
import { secureStorage } from "./storage.helpers";
import requestNewAccessToken from "./request.helpers";

export const CURRENT_CONFIG: CreateAxiosDefaults = {
  baseURL: "http://localhost:3000/api",
}

export const api = axios.create(CURRENT_CONFIG);

api.interceptors.request.use(
    async (config) => {
        const token = secureStorage.get('access_token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Marcar el request para evitar loops infinitos
      const newToken = await requestNewAccessToken();

      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest); // Reintenta la petición original con el nuevo token
      } else {
        secureStorage.remove("access_token");
        secureStorage.remove("refresh_token");
        window.location.href = "/auth/signin";
      }
    }

    return Promise.reject(error);
  }
);