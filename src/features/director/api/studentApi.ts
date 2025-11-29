import { privateApi } from "@/lib/axiosClient"
import type { StudentPaginatedResponse } from "@/types/studentList"

export interface StudentQueryParams {
    page: number
    per_page: number
    student?: string
    advisor?: number
    advisor_id?: number
    company?: string
    company_id?: number
    student_name?: string
    program_id?: number
    section_id?: number
    status?: string
    is_active?: boolean
    sort_by?: string
    sort_order?: "asc" | "desc"
}

export interface BulkUpdateCompanyPayload {
    user_ids: number[]
    company_id: number
    ojt_start_date?: string
    ojt_end_date?: string
}

export interface BulkUpdateAdvisorPayload {
    user_ids: number[]
    advisor_id: number
}

export const fetchStudents = async (
    params: StudentQueryParams
): Promise<StudentPaginatedResponse> => {
    const { data } = await privateApi.get("/api/students", { params })
    return data
}

export const bulkUpdateCompany = async (payload: BulkUpdateCompanyPayload) => {
    return await privateApi.patch("/api/students/company/bulk", payload)
}

export const bulkUpdateAdvisor = async (payload: BulkUpdateAdvisorPayload) => {
    return await privateApi.patch("/api/students/advisor/bulk", payload)
}
