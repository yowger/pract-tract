import { useMutation, useQueryClient } from "@tanstack/react-query"
import { logout } from "../api/authApi"

export function useLogout() {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ["user"] })
        },
    })

    return {
        logout: mutation.mutateAsync,
        isLoading: mutation.isPending,
        error: mutation.error,
    }
}
