import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { privateApi } from "@/lib/axiosClient"

export interface User {
    id: number
    name: string
    email: string
    phone?: string | null
    address?: string | null
    role: string
    status: string
    is_active: boolean | number
    email_verified_at?: string | null
    created_at: string
    updated_at: string
}

export interface Question {
    type: "multiple" | "text"
    title: string
    options?: string[]
}

export interface Evaluation {
    id: number
    name: string
    description?: string | null
    questions: Question[]
    users?: User[]
    created_at: string
    updated_at: string
}

export interface EvaluationPayload {
    name: string
    description?: string
    questions: Question[]
}

export const createEvaluation = async (
    payload: EvaluationPayload
): Promise<Evaluation> => {
    const { data } = await privateApi.post("/api/evaluations", payload)
    return data.evaluation
}

export const useCreateEvaluation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createEvaluation,
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["evaluations"] }),
    })
}

export const fetchEvaluations = async (): Promise<Evaluation[]> => {
    const { data } = await privateApi.get("/api/evaluations")

    return data
}

export const useEvaluations = () => {
    return useQuery({ queryKey: ["evaluations"], queryFn: fetchEvaluations })
}

export const fetchEvaluation = async (id: number): Promise<Evaluation> => {
    const { data } = await privateApi.get(`/api/evaluations/${id}`)
    return data.evaluation
}

export const useEvaluation = (id: number) => {
    return useQuery({
        queryKey: ["evaluations", id],
        queryFn: () => fetchEvaluation(id),
    })
}

export const updateEvaluation = async (
    id: number,
    payload: EvaluationPayload
): Promise<Evaluation> => {
    const { data } = await privateApi.put(`/api/evaluations/${id}`, payload)
    return data.evaluation
}

export const useUpdateEvaluation = (id: number) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (payload: EvaluationPayload) =>
            updateEvaluation(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["evaluations"] })
            queryClient.invalidateQueries({ queryKey: ["evaluations", id] })
        },
    })
}

export const deleteEvaluation = async (id: number): Promise<void> => {
    await privateApi.delete(`/api/evaluations/${id}`)
}

export const useDeleteEvaluation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteEvaluation,
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["evaluations"] }),
    })
}

export interface AssignEvaluationPayload {
    user_ids: number[]
    assigned_at?: string
}

export const assignEvaluation = async (
    evaluationId: number,
    payload: AssignEvaluationPayload
): Promise<void> => {
    await privateApi.post(`/api/evaluations/${evaluationId}/assign`, payload)
}

export const useAssignEvaluation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({
            evaluationId,
            payload,
        }: {
            evaluationId: number
            payload: AssignEvaluationPayload
        }) => assignEvaluation(evaluationId, payload),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["evaluations"] }),
    })
}
