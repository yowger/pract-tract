import { z } from "zod"

import { privateApi } from "@/lib/axiosClient"

export const formSchema = z.object({
    day_of_week: z.array(z.string().min(1)).min(1, "Select at least one day"),
    start_date: z.string(),
    end_date: z.string(),

    am_time_in: z.string().optional(),
    am_time_out: z.string().optional(),
    am_require_photo_in: z.boolean(),
    am_require_photo_out: z.boolean(),
    am_require_location_in: z.boolean(),
    am_require_location_out: z.boolean(),
    am_grace_period_minutes: z.coerce.number<number>().default(0).optional(),
    am_undertime_grace_minutes: z.coerce.number<number>().default(0).optional(),

    pm_time_in: z.string().optional(),
    pm_time_out: z.string().optional(),
    pm_require_photo_in: z.boolean(),
    pm_require_photo_out: z.boolean(),
    pm_require_location_in: z.boolean(),
    pm_require_location_out: z.boolean(),
    pm_grace_period_minutes: z.coerce.number<number>().default(0).optional(),
    pm_undertime_grace_minutes: z.coerce.number<number>().default(0).optional(),

    allow_early_in: z.boolean(),
    early_in_limit_minutes: z.coerce.number<number>().default(0).optional(),

    location: z.string(),
})

export type ScheduleFormValues = z.infer<typeof formSchema>

export async function createSchedule(data: ScheduleFormValues) {
    const res = await privateApi.post("/api/schedules", data)
    return res.data
}

export async function fetchSchedules() {
    const res = await privateApi.get("/api/schedules")
    return res.data
}

export async function fetchSchedule(
    companyId?: number
): Promise<ScheduleFormValues | null> {
    const res = await privateApi.get(`/api/schedules/${companyId}`)
    return res.data
}
