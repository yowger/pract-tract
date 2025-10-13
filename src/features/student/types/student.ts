import type { UserRole } from "@/types/roles"

export type StudentResponse = {
    id: number
    name: string
    email: string
    role: UserRole
    is_active: boolean
    student?: {
        id: number
        student_id: string
        program: {
            id: number
            code: string
            name: string
            description: string
        }
        section: {
            id: number
            name: string
        }
        advisor?: {
            id: number
            name: string
        } | null
        company?: {
            id: number
            name: string
        } | null
    }
}
