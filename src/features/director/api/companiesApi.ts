import type { PaginatedResponse } from "@/types/page"
import { privateApi } from "@/lib/axiosClient"
import type { User } from "@/types/user"

export interface Company {
    id: number
    user_id?: number | null
    name: string
    description?: string | null
    address?: string | null
    phone?: string | null
    email?: string | null
    is_active: boolean
    created_at: string
    updated_at: string
    owner?: User
    students_count?: number
}

export interface CompanyFilters {
    search?: string
    is_active?: boolean
    sort_by?: string
    sort_order?: "asc" | "desc"
    per_page: number
    page: number
}

export type CompanyPaginatedResponse = PaginatedResponse<Company>

export const fetchCompanies = async (
    filters: CompanyFilters
): Promise<CompanyPaginatedResponse> => {
    const { data } = await privateApi.get("/api/companies", { params: filters })
    return data
}

export const fetchCompany = async (id: number): Promise<Company> => {
    const { data } = await privateApi.get(`/api/companies/${id}`)
    return data
}

export const updateCompany = async (
    id: number,
    payload: Partial<Company>
): Promise<void> => {
    const { data } = await privateApi.put(`/api/companies/${id}`, payload)
    return data
}
