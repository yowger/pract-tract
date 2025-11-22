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

export const getViolations = async (
    studentId?: number | string,
    createdBy?: number | string
): Promise<ViolationsResponse> => {
    const params: Record<string, string | number> = {}
    
    if (studentId) params.student_id = studentId
    if (createdBy) params.created_by = createdBy

    const { data } = await privateApi.get("/api/violations", { params })
    return data
}

export const useViolations = (
    studentId?: number | string,
    createdBy?: number | string
) => {
    return useQuery({
        queryKey: ["violations", studentId, createdBy],
        queryFn: () => getViolations(studentId, createdBy),
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
