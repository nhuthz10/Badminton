import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

instance.interceptors.response.use((response) => {
  return response.data;
});

export const axiosAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

axiosAuth.interceptors.response.use((response) => {
  return response.data;
});

export const axiosRed = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_RED,
});

axiosRed.interceptors.response.use((response) => {
  return response.data;
});

export default instance;
