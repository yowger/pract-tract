import { z } from "zod"

import { privateApi } from "@/lib/axiosClient"

export const formSchema = z.object({
    company_id: z.string().optional(),
    day_of_week: z.array(z.string().min(1)).min(1, "Select at least one day"),
    start_date: z.string().optional(),
    end_date: z.string().optional(),

    am_time_in: z.string().optional(),
    am_time_out: z.string().optional(),
    am_require_photo_in: z.boolean(),
    am_require_photo_out: z.boolean(),
    am_require_location_in: z.boolean(),
    am_require_location_out: z.boolean(),
    am_grace_period_minutes: z.number().optional(),
    am_undertime_grace_minutes: z.number().optional(),

    pm_time_in: z.string().optional(),
    pm_time_out: z.string().optional(),
    pm_require_photo_in: z.boolean(),
    pm_require_photo_out: z.boolean(),
    pm_require_location_in: z.boolean(),
    pm_require_location_out: z.boolean(),
    pm_grace_period_minutes: z.number().optional(),
    pm_undertime_grace_minutes: z.number().optional(),

    allow_early_in: z.boolean(),
    early_in_limit_minutes: z.number().optional(),
})

export type ScheduleFormValues = z.infer<typeof formSchema>

export async function createSchedule(data: ScheduleFormValues) {
    const res = await privateApi.post("/schedules", data)
    return res.data
}

export async function fetchSchedules() {
    const res = await privateApi.get("/schedules")
    return res.data
}
