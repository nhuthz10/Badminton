import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export const axiosAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

axiosAuth.interceptors.response.use((response) => {
  return response.data;
});

instance.interceptors.response.use((response) => {
  return response.data;
});

export default instance;
