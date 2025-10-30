import { privateApi } from "@/lib/axiosClient"
import type { Schedule } from "@/types/schedule"

export interface Program {
    id: number
    code: string
    name: string
    description: string | null
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
    phone: string | null
    address: string | null
    role: string
    status: string
    is_active: number
    created_at: string
    updated_at: string
    email_verified_at: string | null
}

export interface Advisor {
    id: number
    user_id: number
    created_at: string
    updated_at: string
    user: User
}

export interface Company {
    id: number
    name: string
    email: string
    phone: string | null
    address: string | null
    description: string | null
    is_active: number
    user_id: number
    created_at: string
    updated_at: string
    schedule: Schedule | null
}

export interface StudentResponse {
    id: number
    student_id: number
    advisor_id: number
    company_id: number
    program_id: number
    section_id: number
    created_at: string
    updated_at: string
    program: Program
    section: Section
    user_id: number
    user: User
    advisor: Advisor
    company: Company
}

export const getStudent = async (
    studentId: number
): Promise<StudentResponse> => {
    const { data } = await privateApi.get<StudentResponse>(
        `/api/students/${studentId}`
    )
    return data
}
