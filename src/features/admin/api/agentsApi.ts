import { useMutation, useQueryClient } from "@tanstack/react-query"

import { privateApi } from "@/lib/axiosClient"

export interface Company {
    id: number
    name: string
    email: string
    is_active: boolean
    created_at: string
    updated_at: string
}

export interface CreateAgentPayload {
    name: string
    email: string
    password: string
    company_name: string
    company_email: string
}

export const createAgent = async (payload: CreateAgentPayload) => {
    const { data } = await privateApi.post("/api/agents", payload)
    return data.agent
}

export const useCreateAgent = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (payload: CreateAgentPayload) => createAgent(payload),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["agents"] })
        },
    })
}
