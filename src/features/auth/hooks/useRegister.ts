import { useMutation, useQueryClient } from "@tanstack/react-query"

import { register } from "../api/authApi"

export function useRegister() {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: register,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] })
        },
    })

    return {
        register: mutation.mutateAsync,
        isLoading: mutation.isPending,
        error: mutation.error,
    }
}
