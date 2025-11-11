import { useMutation, useQueryClient } from "@tanstack/react-query"
import { privateApi } from "@/lib/axiosClient"
import type { Student } from "@/types/studentList"

export interface ViolationPayload {
    student_id?: number | string
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
