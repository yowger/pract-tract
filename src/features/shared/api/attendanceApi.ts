import { privateApi } from "@/lib/axiosClient"
import type { PaginatedResponse } from "../types/page"
import type {
    Attendance,
    AttendanceStudent,
} from "@/features/agent/types/attendance"

export interface AttendanceFilters {
    student_id?: number
    date?: string
    start_date?: string
    end_date?: string
    status?: "present" | "absent" | "late" | "excused"
    per_page?: number
    page?: number
}

export type AttendanceWithStudent = Attendance & {
    student: AttendanceStudent
}

export type AttendancePaginatedResponse =
    PaginatedResponse<AttendanceWithStudent>

export const fetchAttendances = async (
    filters: AttendanceFilters
): Promise<AttendancePaginatedResponse> => {
    const { data } = await privateApi.get("/api/attendances", {
        params: filters,
    })

    return data
}
