import { useState, useEffect } from "react"
import { Clock, CheckCircle, LogOut, AlertCircle } from "lucide-react"
import { useUser } from "@/features/auth/hooks/useUser"
import { isStudent } from "@/features/auth/types/auth"
import { useRecordAttendance } from "@/features/student/hooks/useAttendance"
import { toast } from "sonner"

interface TimeRecord {
    date: string
    clockIn: string
    clockOut?: string
    duration?: string
    status: "active" | "completed"
}

const StudentAttendancePage = () => {
    const { data: user } = useUser()
    const { mutateAsync: recordAttendance } = useRecordAttendance()

    const scheduleId =
        user && isStudent(user?.user)
            ? user.user.student.company?.schedule?.id
            : null

    const [currentTime, setCurrentTime] = useState(new Date())
    const [isClockedIn, setIsClockedIn] = useState(false)
    const [clockInTime, setClockInTime] = useState<string | null>(null)
    const [timeRecords, setTimeRecords] = useState<TimeRecord[]>([
        {
            date: "2024-10-17",
            clockIn: "08:05 AM",
            clockOut: "03:28 PM",
            duration: "7h 23m",
            status: "completed",
        },
        {
            date: "2024-10-16",
            clockIn: "08:00 AM",
            clockOut: "03:32 PM",
            duration: "7h 32m",
            status: "completed",
        },
        {
            date: "2024-10-15",
            clockIn: "08:35 AM",
            clockOut: "03:30 PM",
            duration: "6h 55m",
            status: "completed",
        },
    ])
    const [showNotification, setShowNotification] = useState(false)
    const [notificationMessage, setNotificationMessage] = useState("")

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

    const calculateDuration = (clockIn: string, clockOut: string) => {
        const [inTime, inPeriod] = clockIn.split(" ")
        const [outTime, outPeriod] = clockOut.split(" ")
        const [inHours, inMinutes] = inTime.split(":").map(Number)
        const [outHours, outMinutes] = outTime.split(":").map(Number)

        let inTotalMinutes = inHours * 60 + inMinutes
        let outTotalMinutes = outHours * 60 + outMinutes

        if (inPeriod === "PM" && inHours !== 12) inTotalMinutes += 12 * 60
        if (inPeriod === "AM" && inHours === 12) inTotalMinutes -= 12 * 60
        if (outPeriod === "PM" && outHours !== 12) outTotalMinutes += 12 * 60
        if (outPeriod === "AM" && outHours === 12) outTotalMinutes -= 12 * 60

        const diffMinutes = outTotalMinutes - inTotalMinutes
        const hours = Math.floor(diffMinutes / 60)
        const minutes = diffMinutes % 60

        return `${hours}h ${minutes}m`
    }

    const handleClockIn = () => {
        // const now = currentTime.toLocaleTimeString("en-US", {
        //     hour: "2-digit",
        //     minute: "2-digit",
        //     hour12: true,
        // })
        // setClockInTime(now)
        // setIsClockedIn(true)
        // setNotificationMessage("✓ Successfully clocked in at " + now)
        // setShowNotification(true)
        // setTimeout(() => setShowNotification(false), 3000)

        if (!scheduleId) {
            toast.error("No schedule found for the company.")
        }

        recordAttendance({
            schedule_id: scheduleId!,
            attendance_id: 1,
            time: new Date().toLocaleTimeString("en-GB", {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
            }),
        })
    }

    const handleClockOut = () => {
        if (!clockInTime) return

        const clockOutTimeStr = currentTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        })

        const duration = calculateDuration(clockInTime, clockOutTimeStr)
        const today = formatDate(currentTime).split(",")[0].replace(/\s+/g, " ")
        const dateKey = currentTime.toISOString().split("T")[0]

        const newRecord: TimeRecord = {
            date: dateKey,
            clockIn: clockInTime,
            clockOut: clockOutTimeStr,
            duration: duration,
            status: "completed",
        }

        setTimeRecords([newRecord, ...timeRecords])
        setIsClockedIn(false)
        setClockInTime(null)
        setNotificationMessage(
            "✓ Successfully clocked out at " + clockOutTimeStr
        )
        setShowNotification(true)
        setTimeout(() => setShowNotification(false), 3000)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="max-w-2xl mx-auto">
                {showNotification && (
                    <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg text-green-800 flex items-center gap-2 animate-pulse">
                        <CheckCircle size={20} />
                        {notificationMessage}
                    </div>
                )}

                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <div className="text-center">
                        <p className="text-slate-600 text-lg mb-2">
                            {formatDate(currentTime)}
                        </p>
                        <div className="text-6xl font-bold text-blue-600 font-mono mb-4">
                            {formatTime(currentTime)}
                        </div>

                        {isClockedIn && (
                            <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium mb-8">
                                ✓ Clocked In at {clockInTime}
                            </div>
                        )}
                    </div>

                    <div className="flex gap-4 justify-center">
                        {!isClockedIn ? (
                            <button
                                onClick={handleClockIn}
                                className="flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition shadow-lg text-lg"
                            >
                                <Clock size={24} />
                                Clock In
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={handleClockOut}
                                    className="flex items-center gap-2 px-8 py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition shadow-lg text-lg"
                                >
                                    <LogOut size={24} />
                                    Clock Out
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {isClockedIn && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                        <div className="flex items-start gap-3">
                            <AlertCircle
                                className="text-blue-600 mt-1"
                                size={24}
                            />
                            <div>
                                <p className="font-semibold text-blue-900">
                                    You are currently clocked in
                                </p>
                                <p className="text-blue-700 text-sm mt-1">
                                    Clocked in at{" "}
                                    <span className="font-mono font-bold">
                                        {clockInTime}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold text-slate-900 mb-6">
                        Recent Records
                    </h2>

                    <div className="space-y-4">
                        {timeRecords.map((record, idx) => (
                            <div
                                key={idx}
                                className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <p className="font-semibold text-slate-900">
                                        {new Date(
                                            record.date
                                        ).toLocaleDateString("en-US", {
                                            weekday: "short",
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </p>
                                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                        {record.status === "completed"
                                            ? "Completed"
                                            : "Active"}
                                    </span>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <p className="text-slate-600 text-sm mb-1">
                                            Clock In
                                        </p>
                                        <p className="text-slate-900 font-mono font-semibold">
                                            {record.clockIn}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-slate-600 text-sm mb-1">
                                            Clock Out
                                        </p>
                                        <p className="text-slate-900 font-mono font-semibold">
                                            {record.clockOut || "-"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-slate-600 text-sm mb-1">
                                            Duration
                                        </p>
                                        <p className="text-slate-900 font-mono font-semibold">
                                            {record.duration || "-"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentAttendancePage
