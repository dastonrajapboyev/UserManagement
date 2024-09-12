import axios from "axios";

const token = localStorage.getItem("token");

const instance = axios.create({
  // baseURL: "http://94.131.122.152:3002/api/",
  baseURL: "http://13.51.195.13:3002/api/",
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

// Response interceptor to handle unauthorized errors
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error, e.g., redirect to login
      console.error("Unauthorized. Redirecting to login...");
      localStorage.removeItem("token");
      window.location.href = "/"; // Redirect to login page or another action
    }
    return Promise.reject(error);
  }
);

export default instance;
