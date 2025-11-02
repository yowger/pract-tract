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
}: {
    student_id: number
}) {
    const response = await privateApi.post("/api/attendances/record/self", {
        student_id,
    })
    return response.data
}
