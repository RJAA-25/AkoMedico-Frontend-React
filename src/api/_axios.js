import axios from "axios";
import JSONBig from "json-bigint";
import { getCookie } from "../helpers/utilities";

const BASE_URL = "https://server-akomedico.onrender.com/api/v1";
// const BASE_URL = "http://localhost:3000/api/v1";

export const api = axios.create({
  baseURL: BASE_URL,
  transformResponse: (data) => JSONBig({ storeAsString: true }).parse(data),
  // xsrfCookieName: "CSRF-TOKEN",
  // xsrfHeaderName: "X-CSRF-Token",
  withCredentials: true,
});

export const config = () => {
  return {
    headers: { "Authorization": `Bearer ${getCookie("access_token")}` },
  };
};
