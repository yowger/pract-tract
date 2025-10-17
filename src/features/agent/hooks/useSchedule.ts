import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
    createSchedule,
    fetchSchedules,
    type ScheduleFormValues,
} from "../api/schedule"

export function useSchedules() {
    return useQuery({
        queryKey: ["schedules"],
        queryFn: fetchSchedules,
    })
}

export function useCreateSchedule() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: ScheduleFormValues) => createSchedule(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["schedules"] })
        },
    })
}
