import type { PaginatedResponse } from "@/features/shared/types/page"

export interface Program {
    id: number
    code: string
    name: string
    description: string
    created_at: string
    updated_at: string
}

export interface Section {
    id: number
    name: string
    created_at: string
    updated_at: string
}

export interface User {
    id: number
    name: string
    email: string
    email_verified_at: string | null
    role: string
    status: string
    is_active: boolean
    created_at: string
    updated_at: string
}

export interface Advisor {
    id: number
    user: User
}

export interface Company {
    id: number
    name: string
    email: string
    is_active: boolean
    created_at: string
    updated_at: string
}

export interface Student {
    id: number
    student_id: string
    status: string
    user: User
    program: Program | null
    section: Section | null
    advisor: Advisor | null
    company: Company | null
}

export type StudentPaginatedResponse = PaginatedResponse<Student>
