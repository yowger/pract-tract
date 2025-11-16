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

export async function recordSelfAttendance({
    student_id,
    lat,
    lng,
}: {
    student_id: number
    lat: number
    lng: number
}) {
    if (!lat || !lng) throw new Error("Latitude and longitude are required")

    const response = await privateApi.post("/api/attendances/record/self", {
        student_id,
        lat,
        lng,
    })
    return response.data
}
