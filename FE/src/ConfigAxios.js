"use client";
import { axiosAuth } from "./axios";
import { jwtDecode } from "jwt-decode";
import { handleRefershTokenService } from "./services/userService";
import { logOut } from "./redux-toolkit/userSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const tokenStorage = {
  getItem: (key) => {
    if (localStorage.getItem("isSaveLogin") === "true") {
      return localStorage.getItem(key);
    }
    return sessionStorage.getItem(key);
  },
  setItem: (key, value) => {
    if (localStorage.getItem("isSaveLogin") === "true") {
      localStorage.setItem(key, value);
    } else {
      sessionStorage.setItem(key, value);
    }
  },
  removeItem: (key) => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  },
};

const ConfigAxios = ({ children }) => {
  const dispatch = useDispatch();

  let isRefreshing = false;
  let refreshSubscribers = [];

  const subscribeTokenRefresh = (cb) => {
    refreshSubscribers.push(cb);
  };

  const onRefreshed = (token) => {
    refreshSubscribers.forEach((cb) => cb(token));
    refreshSubscribers = [];
  };

  const refreshToken = async () => {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const refresh_token = tokenStorage.getItem("refresh_token");
        const res = await handleRefershTokenService(refresh_token);
        tokenStorage.setItem("access_token", res.access_token);
        isRefreshing = false;
        onRefreshed(res.access_token);
        return res.access_token;
      } catch (error) {
        isRefreshing = false;
        console.error("Failed to refresh token", error);
        dispatch(logOut());
        toast.error("Phiên đăng nhập đã hết hạn", {
          className: "toast-normal",
        });
        throw error;
      }
    } else {
      return new Promise((resolve) => {
        subscribeTokenRefresh((token) => {
          resolve(token);
        });
      });
    }
  };

  axiosAuth.interceptors.request.use(
    async (config) => {
      let access_token = tokenStorage.getItem("access_token");
      let refresh_token = tokenStorage.getItem("refresh_token");

      if (!access_token || !refresh_token) {
        dispatch(logOut());
        toast.error("Phiên đăng nhập đã hết hạn", {
          className: "toast-normal",
        });
        return Promise.reject("No tokens available");
      }

      const currentTime = new Date();
      const decoded = jwtDecode(access_token);
      const decodedRefreshToken = jwtDecode(refresh_token);

      if (decoded?.exp < currentTime.getTime() / 1000) {
        if (decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
          try {
            const newToken = await refreshToken();
            config.headers["Authorization"] = `Bearer ${newToken}`;
            return config;
          } catch (error) {
            return Promise.reject(error);
          }
        } else {
          dispatch(logOut());
          toast.error("Phiên đăng nhập đã hết hạn", {
            className: "toast-normal",
          });
          return Promise.reject("Refresh token expired");
        }
      } else {
        config.headers["Authorization"] = `Bearer ${access_token}`;
        return config;
      }
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  return <>{children}</>;
};

export default ConfigAxios;