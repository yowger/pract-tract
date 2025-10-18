import type { Schedule } from "@/features/shared/types/schedule"
import type { UserRole } from "./roles"

export type User = {
    id: number
    name: string
    email: string
    phone: string | null
    address: string | null
    role: UserRole
    status: "active" | "inactive" | string
    is_active: number
    email_verified_at: string | null
    created_at: string
    updated_at: string
}

export interface Agent {
    id: number
    user_id: number
    company_id: number
    created_at: string
    updated_at: string
    company: Company
}

export interface Director {
    id: number
    user_id: number
    created_at: string
    updated_at: string
}

interface Program {
    id: number
    code: string
    name: string
    description: string
}

interface Section {
    id: number
    name: string
}

export interface Company {
    id: number
    user_id: number
    name: string
    description: string | null
    email: string
    phone: string | null
    address: string | null
    is_active: number
    created_at: string
    updated_at: string
    schedule?: Schedule
}

export interface Student {
    id: number
    student_id: string
    program: Program
    section: Section
    advisor?: {
        id: number
        name: string
    } | null
    company?: {
        id: number
        name: string
    } | null
}

export interface UserAgent extends User {
    agent: Agent
}

export interface UserStudent extends User {
    student: Student
}

export interface UserDirector extends User {
    director: Director
}
