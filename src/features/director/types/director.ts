import type { UserRole } from "@/types/roles"

export type DirectorResponse = {
    id: number
    email: string
    name: string
    role: UserRole
    is_active: boolean
    director?: {
        id: number
        user_id: number
        created_at: string
        updated_at: string
    }
}
