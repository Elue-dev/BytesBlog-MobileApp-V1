import axios from "axios";

export const httpRequest = axios.create({
  baseURL: "https://bytesblog-server-production.up.railway.app/api/v1",
});
