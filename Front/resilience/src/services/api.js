import axios from "axios";
import { authStore } from "@/stores/authStore";

const instance = axios.create({
  withCredentials: false,
});

instance.interceptors.request.use((config) => {
  const sessionToken = authStore.getToken;
  if (sessionToken) {
    config.headers.Authorization = `Bearer ${sessionToken}`;
  }
  return config;
});

export default instance;
