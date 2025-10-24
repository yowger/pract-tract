import {
    useMutation,
    useQuery,
    useQueryClient,
    type UseQueryResult,
} from "@tanstack/react-query"

import {
    bulkUpdateAdvisor,
    bulkUpdateCompany,
    fetchStudents,
    type StudentQueryParams,
} from "../api/studentApi"

export const useStudents = (
    params: StudentQueryParams
): UseQueryResult<Awaited<ReturnType<typeof fetchStudents>>> => {
    return useQuery({
        queryKey: ["students", params],
        queryFn: () => fetchStudents(params),
    })
}

export const useUpdateStudentsCompany = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: bulkUpdateCompany,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["students"] })
        },
    })
}

export const useUpdateStudentsAdvisor = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: bulkUpdateAdvisor,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["students"] })
        },
    })
}
