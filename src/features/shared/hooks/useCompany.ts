import { useQuery } from "@tanstack/react-query"

import { fetchCompany, fetchCompanyOptions } from "../api/companyApi"
import { fetchAttendanceCharts } from "../api/attendanceApi"

export const useCompanyOptions = () => {
    return useQuery({
        queryKey: ["company-options"],
        queryFn: fetchCompanyOptions,
        // staleTime: Infinity,
        staleTime: 5 * 60 * 1000,
    })
}

export const useCompany = (companyId?: number) => {
    return useQuery({
        queryKey: ["company", companyId],
        queryFn: () => fetchCompany(companyId!),
        enabled: !!companyId,
    })
}

export const useAttendanceCharts = (params: {
    company_id?: number
    start_date?: string
    end_date?: string
    student_name?: string
    student_id?: string | number
}) => {
    return useQuery({
        queryKey: ["attendanceCharts", params],
        queryFn: () => fetchAttendanceCharts(params),
        staleTime: 1000 * 60 * 5,
        enabled: !!params.company_id,
    })
}
