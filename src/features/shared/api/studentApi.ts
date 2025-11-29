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

export interface EvaluationAnswerItem {
    question: string
    type: string
    answer: string
}

export interface EvaluationAnswer {
    id: number
    student_id: number
    evaluation_id: number
    answers: EvaluationAnswerItem[]
    created_at: string
    updated_at: string
    evaluation: {
        id: number
        name: string
        description: string | null
        questions: { title: string; type: string; options?: string[] }[]
        created_at: string
        updated_at: string
    }
    submitter?: {
        id: number
        name: string
        role: "student" | "director" | "agent" | "advisor" | "admin"
    }
}

export interface StudentResponse {
    data: {
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
        evaluation_answers: EvaluationAnswer[]

        hours_attended: number
        absence_hours_manual: number
        absence_hours_auto: number
        auto_absences_count: number
        total_absences_count: number
        effective_required_hours: number
        required_hours: number
        completion: number
        ojt_start_date: string | null
        ojt_end_date: string | null
        projected_end_date: string | null
    }
}

export const getStudent = async (
    studentId: number
): Promise<StudentResponse> => {
    const { data } = await privateApi.get<StudentResponse>(
        `/api/students/${studentId}`
    )
    return data
}
