import {
    useQuery,
    useMutation,
    useQueryClient,
    type UseQueryResult,
} from "@tanstack/react-query"

import {
    fetchCompanies,
    fetchCompany,
    updateCompany,
    type Company,
    type CompanyFilters,
} from "../api/companiesApi"

export const useCompanies = (
    filters: CompanyFilters
): UseQueryResult<Awaited<ReturnType<typeof fetchCompanies>>> => {
    return useQuery({
        queryKey: ["companies", filters],
        queryFn: () => fetchCompanies(filters),
    })
}

export const useCompany = (
    id: number
): UseQueryResult<Awaited<ReturnType<typeof fetchCompany>>> => {
    return useQuery({
        queryKey: ["company", id],
        queryFn: () => fetchCompany(id),
    })
}

export const useUpdateCompany = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
            id,
            payload,
        }: {
            id: number
            payload: Partial<Company>
        }) => updateCompany(id, payload),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({
                queryKey: ["companies"],
            })
            queryClient.invalidateQueries({
                queryKey: ["company", id],
            })
        },
    })
}
