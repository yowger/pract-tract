import { useQuery, type UseQueryResult } from "@tanstack/react-query"
import { getDirectorDashboard } from "../api/dashboardApi"

export const useDirectorDashboard = (): UseQueryResult<
    Awaited<ReturnType<typeof getDirectorDashboard>>
> => {
    return useQuery({
        queryKey: ["director-dashboard"],
        queryFn: getDirectorDashboard,
        retry: false,
        staleTime: 5 * 60 * 1000,
    })
}
