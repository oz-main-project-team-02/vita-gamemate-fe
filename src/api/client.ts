import axios from "axios";

export const client = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});