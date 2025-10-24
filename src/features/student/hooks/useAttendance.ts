import { useMutation, useQueryClient } from "@tanstack/react-query"
import { recordAttendance } from "../api/attendanceApi"

export function useRecordAttendance() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: recordAttendance,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["attendances"],
            })
        },
    })
}
