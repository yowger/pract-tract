import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { privateApi } from "@/lib/axiosClient"

export type ExcuseStatus = "pending" | "approved" | "rejected"

export interface Excuse {
    id?: number
    student_id: number
    attendance_id?: number | null
    title: string
    description?: string
    date: string
    attachments?: ExcuseAttachment[]
    status?: ExcuseStatus
    created_at?: string
    updated_at?: string
}

export interface ExcuseQuery {
    status?: ExcuseStatus
    student_id?: number
    name?: string
    per_page: number
    page: number
}

export interface ExcuseAttachment {
    url: string
    name: string
    type: string
}

export interface ExcuseCompany {
    id: number
    name: string
    email?: string | null
    phone?: string | null
    address?: string | null
    created_at: string
    updated_at: string
    user_id?: number
    is_active?: number
}

export interface ExcuseAdvisor {
    id: number
    user: {
        id: number
        name: string
        email?: string | null
        phone?: string | null
        created_at: string
        updated_at: string
    }
    user_id?: number
}

export interface ExcuseStudent {
    id: number
    user_id: number
    student_id: string
    program_id: number
    section_id: number
    advisor_id?: number
    company_id?: number
    user?: {
        id: number
        name: string
        email: string
    }
    company?: ExcuseCompany
    advisor?: ExcuseAdvisor
}

export interface ExcuseResponse {
    id: number
    student_id: number
    attendance_id?: number | null
    title: string | null
    description?: string | null
    date: string
    attachments?: ExcuseAttachment[]
    status: ExcuseStatus
    created_at: string
    updated_at: string
    student: ExcuseStudent
}

export interface PaginatedResponse<T> {
    data: T[]
    meta?: {
        current_page: number
        last_page: number
        per_page: number
        total: number
    }
}

export const getExcuses = async (
    params?: ExcuseQuery
): Promise<PaginatedResponse<ExcuseResponse>> => {
    const { data } = await privateApi.get(`/api/excuses`, { params })
    return data
}

export const getExcuseById = async (id: number): Promise<ExcuseResponse> => {
    const { data } = await privateApi.get(`/api/excuses/${id}`)
    return data
}

export const createExcuse = async (excuse: Excuse): Promise<ExcuseResponse> => {
    const { data } = await privateApi.post(`/api/excuses`, excuse)
    return data
}

export const updateExcuse = async (
    id: number,
    excuse: Partial<Excuse>
): Promise<ExcuseResponse> => {
    const { data } = await privateApi.put(`/api/excuses/${id}`, excuse)
    return data
}

export const deleteExcuse = async (id: number): Promise<void> => {
    await privateApi.delete(`/api/excuses/${id}`)
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
