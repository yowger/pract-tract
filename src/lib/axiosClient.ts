import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"

export const publicApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: "application/json",
    },
})

export const privateApi = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        Accept: "application/json",
    },
})
