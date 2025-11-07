import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { privateApi } from "@/lib/axiosClient"

export interface Excuse {
    id?: number
    student_id: number
    attendance_id?: number | null
    reason: string
    description?: string
    date: string
    images?: string[]
    status?: "pending" | "approved" | "rejected"
    created_at?: string
    updated_at?: string
}

export interface ExcuseQuery {
    status?: "pending" | "approved" | "rejected"
    student_id?: number
    name?: string
    per_page?: number
    page?: number
}

export type ExcuseStatus = "pending" | "approved" | "rejected"

export interface ExcuseStudent {
    id: number
    user_id: number
    student_id: string
    program_id: number
    section_id: number
    user?: {
        id: number
        name: string
        email: string
    }
}

export interface ExcuseResponse {
    id: number
    student_id: number
    attendance_id?: number | null
    reason: string
    description?: string | null
    date: string
    images?: string[]
    status: ExcuseStatus
    created_at: string
    updated_at: string
    student: ExcuseStudent
}

export const getExcuses = async (params?: ExcuseQuery) => {
    const { data } = await privateApi.get(`/api/excuses`, { params })
    return data
}

export const getExcuseById = async (id: number) => {
    const { data } = await privateApi.get(`/api/excuses/${id}`)
    return data
}

export const createExcuse = async (excuse: Excuse) => {
    const { data } = await privateApi.post(`/api/excuses`, excuse)
    return data
}

export const updateExcuse = async (id: number, excuse: Partial<Excuse>) => {
    const { data } = await privateApi.put(`/api/excuses/${id}`, excuse)
    return data
}

export const deleteExcuse = async (id: number) => {
    const { data } = await privateApi.delete(`/api/excuses/${id}`)
    return data
}

export const useExcuses = (filters?: ExcuseQuery) => {
    return useQuery({
        queryKey: ["excuses", filters],
        queryFn: () => getExcuses(filters),
        staleTime: 1000 * 60 * 2,
    })
}

export const useExcuse = (id?: number) => {
    return useQuery({
        queryKey: ["excuse", id],
        queryFn: () => getExcuseById(id!),
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
    })
}

export const useCreateExcuse = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (payload: Excuse) => createExcuse(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["excuses"] })
        },
    })
}

export const useUpdateExcuse = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
            id,
            payload,
        }: {
            id: number
            payload: Partial<Excuse>
        }) => updateExcuse(id, payload),

        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["excuses"] })
            queryClient.invalidateQueries({ queryKey: ["excuse", id] })
        },
    })
}

export const useDeleteExcuse = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: number) => deleteExcuse(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["excuses"] })
        },
    })
}
