import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
    createSchedule,
    fetchSchedule,
    fetchSchedules,
    updateSchedule,
    type ScheduleFormValues,
} from "../api/schedule"

export function useSchedule(companyId?: number) {
    return useQuery({
        queryKey: ["schedules", companyId],
        queryFn: () => fetchSchedule(companyId),
        enabled: !!companyId,
        staleTime: 1000 * 60,
    })
}

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

export function useUpdateSchedule() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: number
            data: Partial<ScheduleFormValues>
        }) => updateSchedule(id, data),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["schedules", variables.id],
            })
            queryClient.invalidateQueries({ queryKey: ["schedules"] })
        },
    })
}
