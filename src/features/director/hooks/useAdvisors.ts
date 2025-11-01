import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
    fetchAdvisor,
    fetchAdvisors,
    updateAdvisor,
    type AdvisorFilters,
    type Advisor,
    type AdvisorPaginatedResponse,
} from "../api/advisorsApi"

export const useAdvisors = (filters: AdvisorFilters) => {
    return useQuery<AdvisorPaginatedResponse>({
        queryKey: ["advisors", filters],
        queryFn: () => fetchAdvisors(filters),
    })
}

export const useAdvisor = (id: number) => {
    return useQuery<Advisor>({
        queryKey: ["advisor", id],
        queryFn: () => fetchAdvisor(id),
        enabled: !!id,
    })
}

export const useUpdateAdvisor = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
            id,
            payload,
        }: {
            id: number
            payload: Partial<Advisor>
        }) => updateAdvisor(id, payload),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["advisors"] })
            // queryClient.invalidateQueries({ queryKey: ["advisor", data.id] })
        },
    })
}
