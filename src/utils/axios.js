import axios from "axios";

export const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}${process.env.NEXT_PUBLIC_SERVER_BASE_API_URL}`,
  withCredentials: true,
});

export const privateApiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}${process.env.NEXT_PUBLIC_SERVER_BASE_API_URL}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
