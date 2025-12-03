import { useMutation, useQuery } from "@tanstack/react-query"

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

export const downloadAttendancePdf = async (filters: AttendanceFilters) => {
    const { fileName, ...params } = filters

    const response = await privateApi.get("/api/attendances/pdf", {
        params,
        responseType: "blob",
    })

    const blob = new Blob([response.data], { type: "application/pdf" })

    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = fileName ? fileName : "attendance-report.pdf"
    a.click()
    URL.revokeObjectURL(url)
}

export const useDownloadAttendancePdf = () => {
    return useMutation({
        mutationFn: downloadAttendancePdf,
    })
}
