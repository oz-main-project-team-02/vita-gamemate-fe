import axios from 'axios';

axios.defaults.withCredentials = true;

export const mock = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_LOCAL_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
