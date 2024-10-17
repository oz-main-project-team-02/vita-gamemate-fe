import axios from "axios";

export const mock = axios.create({
  baseURL: "http://localhost:5173",
});
