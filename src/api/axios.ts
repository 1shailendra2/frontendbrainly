import axios from "axios";
import { useAuthStore } from "../context/useAuthStore";

const api = axios.create({
  baseURL: "https://brainly-production-399c.up.railway.app/api/v1",
    withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
