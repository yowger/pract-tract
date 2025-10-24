import { useMutation, useQueryClient } from "@tanstack/react-query"

import { updateUsersStatus, type BulkUpdateStatusPayload } from "../api/userApi"

export const useUpdateUsersStatus = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (payload: BulkUpdateStatusPayload) =>
            updateUsersStatus(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["students"] })
        },
    })
}
