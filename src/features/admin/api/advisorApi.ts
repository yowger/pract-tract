import { privateApi } from "@/lib/axiosClient"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export interface CreateAdvisorPayload {
    name: string
    email: string
    password: string
    phone?: string
    address?: string
}

export const createAdvisor = async (payload: CreateAdvisorPayload) => {
    const { data } = await privateApi.post("/api/advisors", payload)
    return data.advisor
}

export const useCreateAdvisor = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (payload: CreateAdvisorPayload) => createAdvisor(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["advisors"] })
        },
    })
}
