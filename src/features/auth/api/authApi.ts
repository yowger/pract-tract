import { privateApi } from "@/lib/axiosClient"
import { AUTH_ENDPOINTS } from "../constants/endpoints"
import type {
    CurrentUserResponse,
    LoginResponse,
    RegisterPayload,
    RegisterResponse,
} from "../types/auth"

export const login = async (
    email: string,
    password: string
): Promise<LoginResponse> => {
    const { data } = await privateApi.post(AUTH_ENDPOINTS.login, {
        email,
        password,
    })

    localStorage.setItem("token", data.token)

    return data
}

export const register = async (
    payload: RegisterPayload
): Promise<RegisterResponse> => {
    const { data } = await privateApi.post(AUTH_ENDPOINTS.register, payload)

    localStorage.setItem("token", data.token)
    return data
}

export const logout = async (): Promise<void> => {
    const { data } = await privateApi.post(AUTH_ENDPOINTS.logout)
    return data
}

export const getCurrentUser = async (): Promise<CurrentUserResponse> => {
    const { data } = await privateApi.get(AUTH_ENDPOINTS.me)
    return data
}
