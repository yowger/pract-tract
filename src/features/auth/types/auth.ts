import type { UserAgent, UserDirector, UserStudent } from "@/types/user"

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

export interface AdvisorResponse extends BaseRegisterPayload {
    advisor: {
        id: number
        user_id: number
    }
}

export type RegisterPayload =
    | StudentRegisterPayload
    | AgentRegisterPayload
    | BaseRegisterPayload

export type UserResponse =
    | UserStudent
    | AdvisorResponse
    | UserAgent
    | UserDirector
// | AdminResponse

export function isDirector(user: UserResponse): user is UserDirector {
    return user.role === "director"
}

export function isStudent(user: UserResponse): user is UserStudent {
    return user.role === "student"
}

export function isAgent(user: UserResponse): user is UserAgent {
    return user.role === "agent"
}

export function isAdvisor(user: UserResponse): user is AdvisorResponse {
    return user.role === "advisor"
}

export type UserRole =
    | "student"
    | "director"
    | "agent"
    | "advisor"
    | "admin"
    | "unknown"

export function getUserRole(user: UserResponse): UserRole {
    if (isStudent(user)) return "student"
    if (isDirector(user)) return "director"
    if (isAgent(user)) return "agent"
    if (isAdvisor(user)) return "advisor"

    return "unknown"
}

export type AuthResponse = { user: UserResponse }

export type CurrentUserResponse = AuthResponse
export type LoginResponse = AuthResponse
export type RegisterResponse = AuthResponse
