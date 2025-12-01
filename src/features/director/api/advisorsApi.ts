import type { PaginatedResponse } from "@/types/page"
import { privateApi } from "@/lib/axiosClient"
import type { User } from "@/types/user"

export interface Advisor {
    id: number
    user_id: number
    students_count: number
    created_at: string
    updated_at: string
    user: User
}

export interface AdvisorFilters {
    name?: string
    email?: string
    status?: string
    sort_by?: string
    program?: number
    sort_order?: "asc" | "desc"
    per_page: number
    page: number
}

export type AdvisorPaginatedResponse = PaginatedResponse<Advisor>

export const fetchAdvisors = async (
    filters: AdvisorFilters
): Promise<AdvisorPaginatedResponse> => {
    const { data } = await privateApi.get("/api/advisors", { params: filters })
    return data
}

export const fetchAdvisor = async (id: number): Promise<Advisor> => {
    const { data } = await privateApi.get(`/api/advisors/${id}`)
    return data
}

export const updateAdvisor = async (
    id: number,
    payload: Partial<Advisor>
): Promise<void> => {
    const { data } = await privateApi.put(`/api/advisors/${id}`, payload)
    return data
}
