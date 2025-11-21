import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import type { Student } from "@/types/studentList"
import type { Evaluation } from "../api/evaluationsApi"

export interface AnswerItem {
    question: string
    type: string
    answer: string
}

export interface EvaluationAnswerPayload {
    evaluation_id: number
    student_id: number
    answers: AnswerItem[]
}

export interface EvaluationAnswerResponse {
    id: number
    evaluation_id: number
    student_id: number
    answers: AnswerItem[]
    created_at: string
    updated_at: string
    student?: Student
    evaluation?: Evaluation
}

import { privateApi } from "@/lib/axiosClient"

export const submitEvaluation = async (
    payload: EvaluationAnswerPayload
): Promise<EvaluationAnswerResponse> => {
    const { data } = await privateApi.post("/api/evaluations/submit", payload)
    return data.data
}

export const getEvaluationAnswers = async (): Promise<
    EvaluationAnswerResponse[]
> => {
    const { data } = await privateApi.get("/api/evaluations/answers")
    return data
}

export const getEvaluationAnswer = async (
    id: number
): Promise<EvaluationAnswerResponse> => {
    const { data } = await privateApi.get(`/api/evaluations/answers/${id}`)
    return data
}

export const useSubmitEvaluation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (payload: EvaluationAnswerPayload) =>
            submitEvaluation(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["evaluationAnswers"] })
        },
    })
}

export const useEvaluationAnswers = () => {
    return useQuery<EvaluationAnswerResponse[]>({
        queryKey: ["evaluationAnswers"],
        queryFn: getEvaluationAnswers,
    })
}

export const useEvaluationAnswer = (id?: number) => {
    return useQuery<EvaluationAnswerResponse>({
        queryKey: ["evaluationAnswer", id],
        queryFn: () => getEvaluationAnswer(id!),
        enabled: !!id,
    })
}
