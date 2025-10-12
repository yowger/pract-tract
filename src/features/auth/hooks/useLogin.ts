import { useMutation, useQueryClient } from "@tanstack/react-query"

import { login } from "../api/authApi"

export function useLogin() {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: ({
            email,
            password,
        }: {
            email: string
            password: string
        }) => login(email, password),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] })
        },
    })

    return {
        login: mutation.mutateAsync,
        isLoading: mutation.isPending,
        error: mutation.error,
    }
}
