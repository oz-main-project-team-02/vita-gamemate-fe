import axios from 'axios';
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
    const request = error.config; // 초기 요청에 대한 내용이 전부 들어있음 (url, method, headers 등)

    if (error.response?.status === 401 && !request._retry && request._retryCount < 3) {
      request._retry = true;
      request._retryCount += 1;
      console.log('request', request);
      try {
        const { data } = await client.get('/api/v1/users/auth/accesstoken/');
        console.log('토큰 재발급 성공', data);
        localStorage.setItem('accessToken', data.access_token);
        request.headers['Authorization'] = `Bearer ${data.access_token}`;

        return client(request);
      } catch (error) {
        console.error('리프레시 토큰 갱신 실패', error);
        handleLogout();
      }
    }
    return Promise.reject(error);
  }
);
