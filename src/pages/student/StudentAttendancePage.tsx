import { useState, useEffect } from "react"
import { Clock } from "lucide-react"
import { useUser } from "@/features/auth/hooks/useUser"
import { isStudent } from "@/features/auth/types/auth"
import { useRecordSelfAttendance } from "@/features/student/hooks/useAttendance"
import { toast } from "sonner"
import { useAttendances } from "@/features/shared/hooks/useAttendance"
import { AxiosError } from "axios"
import DataTable from "@/features/shared/components/Datatable"
import { AgentAttendanceColumns } from "@/features/agent/components/AgentAttendanceColumn"

const StudentAttendancePage = () => {
    const { data: user } = useUser()
    const { mutateAsync: recordSelfAttendance } = useRecordSelfAttendance()

    const studentId = user && isStudent(user?.user) ? user.user?.id : undefined

    const { data: attendances, isLoading: isLoadingAttendances } =
        useAttendances({
            per_page: 10,
            page: 1,
            student_id: studentId,
            start_date: new Date().toISOString().split("T")[0],
            // end_date: new Date().toISOString().split("T")[0],
        })

    const [currentTime, setCurrentTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        })
    }

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    const handleClockIn = async () => {
        if (!studentId) {
            toast.error("You must be logged in as student.")
            return
        }

        try {
            await recordSelfAttendance({
                student_id: studentId,
            })

            toast.success("Successfully clocked in.")
        } catch (error) {
            console.log("🚀 ~ handleClockIn ~ error:", error)
            if (error instanceof AxiosError) {
                toast.error(
                    error?.response?.data?.error || "Failed to clock in."
                )
            }
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <div className="text-center">
                        <p className="text-slate-600 text-lg mb-2">
                            {formatDate(currentTime)}
                        </p>
                        <div className="text-6xl font-bold text-blue-600 font-mono mb-4">
                            {formatTime(currentTime)}
                        </div>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={handleClockIn}
                            className="flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition shadow-lg text-lg"
                        >
                            <Clock size={24} />
                            Clock In
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            Today’s Attendance
                        </h2>

                        <div>
                            <DataTable
                                data={attendances?.data || []}
                                columns={AgentAttendanceColumns}
                                isLoading={isLoadingAttendances}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentAttendancePage
