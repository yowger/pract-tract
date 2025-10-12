import { useQuery } from "@tanstack/react-query"

import { getCurrentUser } from "../api/authApi"

export function useUser() {
    const query = useQuery({
        queryKey: ["user"],
        queryFn: getCurrentUser,
        retry: false,
    })

    return {
        user: query.data,
        isLoading: query.isLoading,
        isAuthenticated: !!query.data,
        error: query.error,
    }
}
