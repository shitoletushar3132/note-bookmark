// src/api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://note-bookmark.onrender.com/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
