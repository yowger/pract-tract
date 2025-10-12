import { useMutation, useQueryClient } from "@tanstack/react-query"

import { login } from "../api/authApi"

export const useLogin = () => {
    const queryClient = useQueryClient()

    return useMutation({
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
}
