import { privateApi } from "@/lib/axiosClient"
import type { StudentPaginatedResponse } from "@/types/studentList"

export const fetchStudents = async (
    params = {}
): Promise<StudentPaginatedResponse> => {
    const { data } = await privateApi.get("/api/students", { params })
    return data
}
