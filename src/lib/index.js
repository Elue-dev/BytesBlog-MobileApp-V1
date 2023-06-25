import axios from "axios";

export const httpRequest = axios.create({
  baseUrl: "http://172.20.10.10:8000/api/v1",
});
