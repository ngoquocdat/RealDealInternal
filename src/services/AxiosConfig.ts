import axios from "axios";

const BASE_URL = "https://localhost:7097/api/";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {},
});

api.interceptors.request.use(
  (config) => {
    const credential = localStorage.getItem("credential");
    const accessToken = credential ? JSON.parse(credential).accessToken : null;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
