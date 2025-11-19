import { useQuery } from "@tanstack/react-query"

import { fetchAttendances, type AttendanceFilters } from "../api/attendanceApi"
import { privateApi } from "@/lib/axiosClient"

export const useAttendances = (filters: AttendanceFilters) => {
    return useQuery({
        queryKey: ["attendances", filters],
        queryFn: () => fetchAttendances(filters),
        staleTime: 1000 * 60,
    })
}

export type AttendanceStatus = {
    can_clock: boolean
    type: "IN" | "OUT" | null
    shift: "AM" | "PM" | null
    require_photo: boolean
    reason?: string
}

export const fetchAttendanceStatus = async (): Promise<AttendanceStatus> => {
    const { data } = await privateApi.get("/api/attendances/status")
    return data
}

export const useAttendanceStatus = () => {
    return useQuery<AttendanceStatus>({
        queryKey: ["attendanceStatus"],
        queryFn: fetchAttendanceStatus,
        staleTime: 30 * 1000,
    })
}
