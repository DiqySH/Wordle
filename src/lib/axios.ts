import axios from "axios";

export const api = axios.create({
  baseURL: "https://random-word-api.vercel.app/api",
});
