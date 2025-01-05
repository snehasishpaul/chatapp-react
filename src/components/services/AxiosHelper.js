import axios from "axios";

export const baseURL = "http://localhost:8080";

export const AxiosHelper = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
