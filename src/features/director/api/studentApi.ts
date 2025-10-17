import { privateApi } from "@/lib/axiosClient"
import type { StudentPaginatedResponse } from "@/types/studentList"

export interface StudentQueryParams {
    page?: number
    per_page?: number
    student?: string
    advisor?: string
    company?: string
    program_id?: number
    section_id?: number
    status?: string
    is_active?: boolean
    sort_by?: string
    sort_order?: "asc" | "desc"
}

export const fetchStudents = async (
    params: StudentQueryParams
): Promise<StudentPaginatedResponse> => {
    const { data } = await privateApi.get("/api/students", { params })
    return data
}
