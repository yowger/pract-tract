import type { UserRole } from "@/types/roles"

export type StudentResponse = {
    id: number
    student_id: string
    user: {
        id: number
        name: string
        email: string
        role: UserRole
        phone: string | null
        address: string | null
        created_at: string
        updated_at: string
    }
    program: { id: number; code: string; name: string; description: string }
    section: { id: number; name: string }
    advisor?: { id: number; name: string } | null
    company?: { id: number; name: string } | null
}
