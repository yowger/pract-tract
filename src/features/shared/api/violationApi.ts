import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { privateApi } from "@/lib/axiosClient"
import type { Student } from "@/types/studentList"
import { type PaginatedResponse } from "./excuseApi"

export interface ViolationPayload {
    student_id: number
    name: string
    violation_type: string
    remarks?: string
    date: string
    attachments?: string[]
}

export interface ViolationResponse {
    id: number
    student_id?: number
    name: string
    violation_type: string
    remarks?: string
    date: string
    attachments?: string[]
    created_at: string
    updated_at: string
    student?: Student
    reporter?: {
        id: number
        name: string
        role: string
    }
}

export type ViolationsResponse = PaginatedResponse<ViolationResponse>

export interface ViolationFilters {
    studentId?: number | string
    studentName?: string
    createdBy?: number | string
    advisorId?: number | string
}

export const getViolations = async (
    filters: ViolationFilters = {}
): Promise<ViolationsResponse> => {
    const params: Record<string, string | number> = {}

    if (filters.studentId) params.student_id = filters.studentId
    if (filters.studentName) params.student_name = filters.studentName
    if (filters.createdBy) params.created_by = filters.createdBy
    if (filters.advisorId) params.advisor_id = filters.advisorId

    const { data } = await privateApi.get("/api/violations", { params })
    return data
}

export const useViolations = (filters: ViolationFilters = {}) => {
    return useQuery({
        queryKey: ["violations", filters],
        queryFn: () => getViolations(filters),
        enabled:
            !!filters.studentId ||
            !!filters.studentName ||
            !!filters.createdBy ||
            !!filters.advisorId,
    })
}

export const createViolation = async (
    payload: ViolationPayload
): Promise<ViolationResponse> => {
    const { data } = await privateApi.post("/api/violations", payload)
    return data.violation
}

export const useCreateViolation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (payload: ViolationPayload) => createViolation(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["violations"] })
        },
    })
}
