export interface Schedule {
    id: number
    company_id: number
    start_date: string
    end_date: string
    day_of_week: string[]
    allow_early_in: boolean
    early_in_limit_minutes: number

    am_time_in: string
    am_time_out: string
    am_grace_period_minutes: number
    am_undertime_grace_minutes: number
    am_require_photo_in: boolean
    am_require_photo_out: boolean
    am_require_location_in: boolean
    am_require_location_out: boolean

    pm_time_in: string
    pm_time_out: string
    pm_grace_period_minutes: number
    pm_undertime_grace_minutes: number
    pm_require_photo_in: boolean
    pm_require_photo_out: boolean
    pm_require_location_in: boolean
    pm_require_location_out: boolean
    lat?: number | null
    lng?: number | null
    radius: number

    created_at: string
    updated_at: string
}
