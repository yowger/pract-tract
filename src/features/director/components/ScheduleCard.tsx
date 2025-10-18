import React from "react"
import { Clock } from "lucide-react"
import type { Schedule } from "@/features/shared/types/schedule"

interface ShiftCardProps {
    title: string
    timeIn: string
    timeOut: string
    graceMinutes: number
    data: {
        undertime_grace_minutes: number
        require_photo_in: boolean
        require_photo_out: boolean
        require_location_in: boolean
        require_location_out: boolean
    }
}

export const ScheduleCard = ({ schedule }: { schedule: Schedule }) => {
    const formatTime = (timeStr: string) => {
        const [hours, minutes] = timeStr.split(":")
        const h = parseInt(hours)
        const m = minutes
        const period = h >= 12 ? "PM" : "AM"
        const displayHours = h % 12 || 12
        return `${displayHours}:${m} ${period}`
    }

    const formatDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })

    const ShiftCard: React.FC<ShiftCardProps> = ({
        title,
        timeIn,
        timeOut,
        graceMinutes,
        data,
    }) => (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="w-full px-6 py-4 flex items-center justify-between bg-gray-50">
                <div className="flex items-center gap-4">
                    <div
                        className={`p-3 rounded-lg ${
                            title === "Morning Shift"
                                ? "bg-blue-100"
                                : "bg-amber-100"
                        }`}
                    >
                        <Clock
                            className={
                                title === "Morning Shift"
                                    ? "text-blue-600"
                                    : "text-amber-600"
                            }
                            size={24}
                        />
                    </div>
                    <div className="text-left">
                        <h3 className="font-semibold text-gray-900">{title}</h3>
                        <p className="text-sm text-gray-600">
                            {formatTime(timeIn)} - {formatTime(timeOut)}
                        </p>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded border border-gray-200">
                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            Grace Period
                        </p>
                        <p className="text-lg font-bold text-gray-900 mt-1">
                            {graceMinutes} mins
                        </p>
                    </div>
                    <div className="bg-white p-3 rounded border border-gray-200">
                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            Undertime Grace
                        </p>
                        <p className="text-lg font-bold text-gray-900 mt-1">
                            {data.undertime_grace_minutes} mins
                        </p>
                    </div>
                </div>

                <div>
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">
                        Requirements
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                        {[
                            ["Photo In", data.require_photo_in],
                            ["Photo Out", data.require_photo_out],
                            ["Location In", data.require_location_in],
                            ["Location Out", data.require_location_out],
                        ].map(([label, active], index) => (
                            <div
                                key={index}
                                className={`flex items-center gap-2 p-2 rounded ${
                                    active ? "bg-green-50" : "bg-gray-100"
                                }`}
                            >
                                <div
                                    className={`w-2 h-2 rounded-full ${
                                        active ? "bg-green-500" : "bg-gray-300"
                                    }`}
                                />
                                <span className="text-sm text-gray-700">
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <div>
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Company Schedule
                    </h1>
                    <p className="text-gray-600">
                        Shift hours and attendance requirements
                    </p>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                Valid Period
                            </p>
                            <p className="text-lg font-semibold text-gray-900 mt-2">
                                {formatDate(schedule.start_date)} -{" "}
                                {formatDate(schedule.end_date)}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                Working Days
                            </p>
                            <div className="flex flex-wrap gap-1 mt-2">
                                {schedule.day_of_week.map((day) => (
                                    <span
                                        key={day}
                                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium capitalize"
                                    >
                                        {day.slice(0, 3)}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                Early Check-In
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                                <p className="text-gray-900 font-medium">
                                    {schedule.allow_early_in
                                        ? `Up to ${schedule.early_in_limit_minutes} mins`
                                        : "Disabled"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 mb-8">
                    <ShiftCard
                        title="Morning Shift"
                        timeIn={schedule.am_time_in}
                        timeOut={schedule.am_time_out}
                        graceMinutes={schedule.am_grace_period_minutes}
                        data={{
                            undertime_grace_minutes:
                                schedule.am_undertime_grace_minutes,
                            require_photo_in: schedule.am_require_photo_in,
                            require_photo_out: schedule.am_require_photo_out,
                            require_location_in:
                                schedule.am_require_location_in,
                            require_location_out:
                                schedule.am_require_location_out,
                        }}
                    />
                    <ShiftCard
                        title="Afternoon Shift"
                        timeIn={schedule.pm_time_in}
                        timeOut={schedule.pm_time_out}
                        graceMinutes={schedule.pm_grace_period_minutes}
                        data={{
                            undertime_grace_minutes:
                                schedule.pm_undertime_grace_minutes,
                            require_photo_in: schedule.pm_require_photo_in,
                            require_photo_out: schedule.pm_require_photo_out,
                            require_location_in:
                                schedule.pm_require_location_in,
                            require_location_out:
                                schedule.pm_require_location_out,
                        }}
                    />
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-4 text-center text-sm text-gray-500">
                    <p>
                        Created {formatDate(schedule.created_at)} • Last updated{" "}
                        {formatDate(schedule.updated_at)}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ScheduleCard
