import { useQuery } from "@tanstack/react-query"

import { getCurrentUser } from "../api/authApi"

export const useUser = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: getCurrentUser,
        retry: false,
    })
}
