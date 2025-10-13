import { useMutation, useQueryClient } from "@tanstack/react-query"

import { login } from "../api/authApi"

export const useLogin = () => {
    const queryClient = useQueryClient()

    return useMutation<
        Awaited<ReturnType<typeof login>>,
        Error,
        { email: string; password: string }
    >({
        mutationFn: ({ email, password }) => login(email, password),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] })
        },
    })
}
