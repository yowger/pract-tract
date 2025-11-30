import { z } from "zod"

import { privateApi } from "@/lib/axiosClient"

export const formSchema = z.object({
    day_of_week: z.array(z.string().min(1)).min(1, "Select at least one day"),
    // start_date: z.string(),
    // end_date: z.string(),

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
    radius: z.number().min(1),
})

export interface Company {
    id: number
    user_id: number
    name: string
    email: string
    phone?: string | null
    address?: string | null
    description?: string | null
    is_active: number
    created_at: string
    updated_at: string
}

export interface FetchedSchedule {
    id: number
    company_id: number
    company?: Company
    day_of_week: string
    // start_date: string
    // end_date: string
    am_time_in: string
    am_time_out: string
    am_require_photo_in: 0 | 1
    am_require_photo_out: 0 | 1
    am_require_location_in: 0 | 1
    am_require_location_out: 0 | 1
    am_grace_period_minutes: number
    am_undertime_grace_minutes: number
    pm_time_in: string
    pm_time_out: string
    pm_require_photo_in: 0 | 1
    pm_require_photo_out: 0 | 1
    pm_require_location_in: 0 | 1
    pm_require_location_out: 0 | 1
    pm_grace_period_minutes: number
    pm_undertime_grace_minutes: number
    allow_early_in: 0 | 1
    early_in_limit_minutes: number
    lat?: number | null
    lng?: number | null
    radius: number
    created_at: string
    updated_at: string
}

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
): Promise<FetchedSchedule | null> {
    const res = await privateApi.get(`/api/schedules/${companyId}`)
    return res.data
}

export async function updateSchedule(
    id: number,
    data: Partial<ScheduleFormValues>
) {
    const res = await privateApi.put(`/api/schedules/${id}`, data)
    return res.data
}
