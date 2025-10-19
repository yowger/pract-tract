import { useQuery } from "@tanstack/react-query"

import { fetchAttendances, type AttendanceFilters } from "../api/attendanceApi"

export const useAttendances = (filters: AttendanceFilters) => {
    return useQuery({
        queryKey: ["attendances", filters],
        queryFn: () => fetchAttendances(filters),
        staleTime: 1000 * 60,
    })
}
