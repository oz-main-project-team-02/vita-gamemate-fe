import axios from "axios";
import Cookies from "js-cookie";
import { useUserStore } from "../config/store";

export const client = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

function handleLogout() {
  localStorage.removeItem("access_token");
  useUserStore.getState().reset();
  window.location.href = "/";
}

client.interceptors.request.use(
  (config) => {
    const access = localStorage.getItem("access_token");

    if (access) {
      config.headers["Authorization"] = `Bearer ${access}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh = Cookies.get("refresh_token");

      if (refresh) {
        try {
          const { data } = await client.post(
            "/api/v1/users/auth/accesstoken/",
            {
              refresh,
            }
          );
          console.log("토큰 재발급 성공");
          localStorage.setItem("access_token", data.access_token);
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${data.access_token}`;

          return client(originalRequest);
        } catch (error) {
          console.error("리프레시 토큰 갱신 실패", error);
          handleLogout();
        }
      }
    }
    return Promise.reject(error);
  }
);
