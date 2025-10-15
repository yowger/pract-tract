import { privateApi } from "@/lib/axiosClient"
import type { StudentResponse } from "@/features/student/types/student"
import type { DirectorResponse } from "@/features/director/types/director"
import { AUTH_ENDPOINTS } from "../constants/endpoints"

export interface BaseRegisterPayload {
    name: string
    email: string
    password: string
    password_confirmation: string
    role: "student" | "director" | "agent" | "advisor" | "admin"
    phone?: string
    address?: string
    is_active?: boolean
}

export interface StudentRegisterPayload extends BaseRegisterPayload {
    role: "student"
    student_id: string
    program_id: number
    section_id: number
    advisor_id?: number
    company_id?: number
}

export interface AgentRegisterPayload extends BaseRegisterPayload {
    role: "agent"
    company_name: string
    company_email: string
}

export type RegisterPayload =
    | StudentRegisterPayload
    | AgentRegisterPayload
    | BaseRegisterPayload

export type UserResponse =
    | StudentResponse
    // | AdvisorResponse
    // | AgentResponse
    | DirectorResponse
// | AdminResponse

export function isDirector(user: UserResponse): user is DirectorResponse {
    return user.role === "director"
}

export function isStudent(user: UserResponse): user is StudentResponse {
    return user.role === "student"
}

export type AuthResponse = { user: UserResponse }

export type CurrentUserResponse = AuthResponse
export type LoginResponse = AuthResponse
export type RegisterResponse = AuthResponse

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
    return data
}
