import { privateApi } from "@/lib/axiosClient"
import { AUTH_ENDPOINTS } from "../constants/endpoints"
import type {
    CurrentUserResponse,
    LoginResponse,
    RegisterPayload,
    RegisterResponse,
} from "../types/auth"

export const getCsrfCookie = async () => {
    await privateApi.get(AUTH_ENDPOINTS.csrf)
}

export const login = async (
    email: string,
    password: string
): Promise<LoginResponse> => {
    await getCsrfCookie()
    const { data } = await privateApi.post(AUTH_ENDPOINTS.login, {
        email,
        password,
    })
    return data
}

export const register = async (
    payload: RegisterPayload
): Promise<RegisterResponse> => {
    await getCsrfCookie()
    const { data } = await privateApi.post(AUTH_ENDPOINTS.register, payload)
    return data
}

export const logout = async (): Promise<void> => {
    const { data } = await privateApi.post(AUTH_ENDPOINTS.logout)
    return data
}

export const getCurrentUser = async (): Promise<CurrentUserResponse> => {
    const { data } = await privateApi.get(AUTH_ENDPOINTS.me)
    console.log("🚀 ~ getCurrentUser ~ data:", data)
    return data
}
