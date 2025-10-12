import { privateApi, publicApi } from "@/lib/axiosClient"

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

export const getCsrfCookie = async () => {
    await publicApi.get("/sanctum/csrf-cookie")
}

export const login = async (email: string, password: string) => {
    await getCsrfCookie()
    const { data } = await publicApi.post("/login", { email, password })
    return data
}

export const register = async (payload: RegisterPayload) => {
    await getCsrfCookie()
    const { data } = await publicApi.post("/register", payload)
    return data
}

export const logout = async () => {
    const { data } = await privateApi.post("/logout")
    return data
}

export const getCurrentUser = async () => {
    const { data } = await privateApi.get("/me")
    return data
}
