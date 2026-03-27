import axios from "axios";

// const BASE_URL = "http://10.113.201.239:8000/api";
const BASE_URL = "http://localhost:8000/api";

export const publicAPI = axios.create({
  baseURL: BASE_URL,
});

export const privateAPI = axios.create({
  baseURL: BASE_URL,
});

privateAPI.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("access") || sessionStorage.getItem("access");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

publicAPI.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

privateAPI.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);
