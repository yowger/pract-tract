import { privateApi } from "@/lib/axiosClient"
import type { PaginatedResponse } from "../../../types/page"
import type {
    Attendance,
    AttendanceStudent,
} from "@/features/agent/types/attendance"

export type AttendanceStatus = "present" | "absent" | "late" | "excused"

export interface AttendanceFilters {
    student_name?: string
    student_id?: number
    company_id?: number
    date?: string
    start_date?: string
    end_date?: string
    status?: AttendanceStatus
    per_page: number
    page: number
}

export type AttendanceWithStudent = Attendance & {
    student: AttendanceStudent
}

export type AttendancePaginatedResponse =
    PaginatedResponse<AttendanceWithStudent>

export interface AttendanceChartLineData {
    date: string
    present: number
    absent: number
    late: number
    excused: number
    undertime: number
}

export interface AttendanceChartPieData {
    name: string
    value: number
}

export interface AttendanceChartsResponse {
    lineData: AttendanceChartLineData[]
    pieData: AttendanceChartPieData[]
}

export const fetchAttendances = async (
    filters: AttendanceFilters
): Promise<AttendancePaginatedResponse> => {
    const { data } = await privateApi.get("/api/attendances", {
        params: filters,
    })

    return data
}

export const fetchAttendanceCharts = async (params: {
    company_id?: number
    start_date?: string
    end_date?: string
    student_name?: string
    student_id?: string | number
}): Promise<AttendanceChartsResponse> => {
    const response = await privateApi.get("/api/attendances/charts", { params })

    return response.data
}

