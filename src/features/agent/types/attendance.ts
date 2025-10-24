import type { User } from "@/types/user"

export interface AttendanceStudent {
    id: number
    user_id: number
    student_id: string
    program_id: number
    section_id: number
    advisor_id: number | null
    company_id: number | null
    status: string
    created_at: string
    updated_at: string
    user: User
}

export interface Attendance {
    id: number
    student_id: number
    date: string

    am_status: "present" | "absent" | "late" | "excused" | null
    am_time_in: string | null
    am_time_out: string | null
    am_photo_in: string | null
    am_photo_out: string | null
    am_lat_in: number | null
    am_lng_in: number | null
    am_lat_out: number | null
    am_lng_out: number | null

    pm_status: "present" | "absent" | "late" | "excused" | null
    pm_time_in: string | null
    pm_time_out: string | null
    pm_photo_in: string | null
    pm_photo_out: string | null
    pm_lat_in: number | null
    pm_lng_in: number | null
    pm_lat_out: number | null
    pm_lng_out: number | null
    duration_minutes: number | null

    remarks: string | null
    updated_by: number | null

    created_at: string
    updated_at: string
}
