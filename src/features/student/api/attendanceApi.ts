import { privateApi } from "@/lib/axiosClient"

export type RecordAttendancePayload = {
    attendance_id: number
    schedule_id: number
    time?: string
}

export async function recordAttendance(data: RecordAttendancePayload) {
    const response = await privateApi.post("/api/attendances/record", data)
    return response.data
}
