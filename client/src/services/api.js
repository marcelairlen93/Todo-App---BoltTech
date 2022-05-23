import axios from "axios";
import { config } from "../config";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: config.BASEURL
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;