import axios from "axios";
import JSONBig from "json-bigint";

const BASE_URL = "https://server-akomedico.onrender.com/api/v1";

export const api = axios.create({
  baseURL: BASE_URL,
  transformResponse: (data) => JSONBig({ storeAsString: true }).parse(data),
  xsrfCookieName: "CSRF-TOKEN",
  xsrfHeaderName: "X-CSRF-Token",
  withCredentials: true,
});
