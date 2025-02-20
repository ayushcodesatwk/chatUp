import axios from "axios";

export const axiosInstance = axios.create({
    baseUrl : "http://localhost:4000/api",
    withCredentials: true,
});