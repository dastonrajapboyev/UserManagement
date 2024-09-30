import axios from "axios";

const token = localStorage.getItem("token");

const instance = axios.create({
  // baseURL: "http://94.131.122.152:3002/api/",
  // baseURL: "http://13.51.195.13:3002/api/",
  baseURL: "https://task-api.of-astora.me/api",
  headers: {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized. Redirecting to login...");
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default instance;
