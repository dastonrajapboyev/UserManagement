import axios from "axios";

const token = localStorage.getItem("token");

const instance = axios.create({
  baseURL: "http://94.131.122.152:3002/api/", // Replace with your actual API base URL
  headers: {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }), // Add the token conditionally
  },
});

export default instance;
