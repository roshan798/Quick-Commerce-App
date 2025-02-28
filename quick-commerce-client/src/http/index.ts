import axios from "axios";
import CONFIG from "../config.ts";

const axiosInstance = axios.create({
    baseURL: CONFIG.API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials :true
});

export default axiosInstance;
