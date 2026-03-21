import axios from "axios";
import camelcaseKeys from "camelcase-keys";

const BASE_URL = "http://192.168.254.31:8000/api";

// Public API
export const publicAPI = axios.create({
  baseURL: BASE_URL,
});

// Private API
export const privateAPI = axios.create({
  baseURL: BASE_URL,
});

// Convert snake_case response keys to camelCase
const handleResponse = (response) => {
  if (response.data) {
    response.data = camelcaseKeys(response.data, { deep: true });
  }
  return response;
};

publicAPI.interceptors.response.use(handleResponse, (error) =>
  Promise.reject(error),
);

privateAPI.interceptors.response.use(handleResponse, (error) =>
  Promise.reject(error),
);

// Attach JWT token from storage
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
