import { useMutation, useQueryClient } from "@tanstack/react-query"
import { recordAttendance, recordSelfAttendance } from "../api/attendanceApi"

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

export function useRecordSelfAttendance() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: recordSelfAttendance,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["attendances"],
            })
        },
    })
}
