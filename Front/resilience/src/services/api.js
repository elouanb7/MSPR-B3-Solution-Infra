import axios from "axios";

const instance = axios.create({
  withCredentials: false,
});

instance.interceptors.request.use((config) => {
  const sessionToken = localStorage.getItem("token");
  if (sessionToken) {
    config.headers.Authorization = `Bearer ${sessionToken}`;
  }
  return config;
});

export default instance;
