import axios from "axios";

export const BASE_URL = "https://private-chat-app-java-production.up.railway.app/api/v1";
export const BASE_URL_IMAGE = "https://private-chat-app-java-production.up.railway.app/userImages/"
export const ONLY_BASE_URL = "https://private-chat-app-java-production.up.railway.app"

// export const BASE_URL = "http://localhost:5555/api/v1";
// export const BASE_URL_IMAGE = "http://localhost:5555/userImages/"
// export const ONLY_BASE_URL = "http://localhost:5555"

export const axiosRequest = axios.create({
    baseURL: BASE_URL
});

