import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1";

export const api = axios.create({
  baseURL: BASE_URL,
  xsrfCookieName: "CSRF-TOKEN",
  xsrfHeaderName: "X-CSRF-Token",
  withCredentials: true,
});
