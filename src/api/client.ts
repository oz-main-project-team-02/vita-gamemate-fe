import axios from 'axios';
import Cookies from 'js-cookie';
import { useUserStore } from '../config/store';

axios.defaults.withCredentials = true;

export const client = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

function handleLogout() {
  localStorage.removeItem('accessToken');
  useUserStore.getState().unSetUser();
  window.location.href = '/';
}

client.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
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
    const originalRequest = error.config; // 초기 요청에 대한 내용이 전부 들어있음 (url, method, headers 등)

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get('refresh_token');

      if (refreshToken) {
        try {
          const { data } = await client.post('/api/v1/users/auth/accesstoken/', {
            refreshToken,
          });
          console.log('토큰 재발급 성공');
          localStorage.setItem('accessToken', data.access_token);
          originalRequest.headers['Authorization'] = `Bearer ${data.access_token}`;

          return client(originalRequest);
        } catch (error) {
          console.error('리프레시 토큰 갱신 실패', error);
          handleLogout();
        }
      }
    }
    return Promise.reject(error);
  }
);
