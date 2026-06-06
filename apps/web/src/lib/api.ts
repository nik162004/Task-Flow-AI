import axios from "axios";
import { useSessionStore } from "../store/session";

export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:4000/api/v1" });

api.interceptors.request.use((config) => {
  const { token, organizationId } = useSessionStore.getState();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  if (organizationId) config.headers["x-organization-id"] = organizationId;
  return config;
});
