import type { Schedule } from "./schedule"
import type { Agent, User } from "./user"

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
    schedule: Schedule | null
    agents: Agent[]
    owner: User

    students_count: number
}
