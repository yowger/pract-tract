import { useQuery, type UseQueryResult } from "@tanstack/react-query"
import { getCurrentUser } from "../api/authApi"

export const useUser = (): UseQueryResult<
    Awaited<ReturnType<typeof getCurrentUser>>
> => {
    return useQuery({
        queryKey: ["user"],
        queryFn: getCurrentUser,
        retry: false,
    })
}
