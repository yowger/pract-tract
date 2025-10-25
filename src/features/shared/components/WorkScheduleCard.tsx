import { Clock } from "lucide-react"

import type { Schedule } from "@/types/schedule"

interface WorkScheduleCardProps {
    schedule: Schedule
    formatDate: (date: string) => string
    formatTime: (time: string) => string
}

function Requirement({
    label,
    required,
    color = "blue",
}: {
    label: string
    required: boolean | number
    color?: string
}) {
    const active = Boolean(required)

    return (
        <div
            className={`p-3 rounded-lg border text-center ${
                active
                    ? `border-${color}-500 bg-${color}-50 text-${color}-700`
                    : "border-gray-300 bg-gray-50 text-gray-500"
            }`}
        >
            <span className="text-xs font-medium">{label}</span>
        </div>
    )
}

export default function WorkScheduleCard({
    schedule,
    formatDate,
    formatTime,
}: WorkScheduleCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Work Schedule
            </h2>

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-slate-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">
                            Schedule Period
                        </p>
                        <p className="font-medium text-gray-900">
                            {formatDate(schedule.start_date)} —{" "}
                            {formatDate(schedule.end_date)}
                        </p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">
                            Working Days
                        </p>
                        <p className="font-medium text-gray-900 capitalize">
                            {Array.isArray(schedule.day_of_week)
                                ? schedule.day_of_week.join(", ")
                                : "Not set"}
                        </p>
                    </div>
                </div>

                <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Shift Times
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <p className="font-semibold text-gray-900 flex items-center gap-2">
                                <Clock className="w-4 h-4" /> Morning Shift
                            </p>
                            <div className="space-y-2 pl-6 text-sm">
                                <p>
                                    <span className="text-gray-600">In:</span>{" "}
                                    <span className="font-medium">
                                        {formatTime(schedule.am_time_in)}
                                    </span>
                                </p>
                                <p>
                                    <span className="text-gray-600">Out:</span>{" "}
                                    <span className="font-medium">
                                        {formatTime(schedule.am_time_out)}
                                    </span>
                                </p>
                                <p>
                                    <span className="text-gray-600">
                                        Grace Period:
                                    </span>{" "}
                                    <span className="font-medium">
                                        {schedule.am_grace_period_minutes} mins
                                    </span>
                                </p>
                                <p>
                                    <span className="text-gray-600">
                                        Undertime Grace:
                                    </span>{" "}
                                    <span className="font-medium">
                                        {schedule.am_undertime_grace_minutes}{" "}
                                        mins
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="font-semibold text-gray-900 flex items-center gap-2">
                                <Clock className="w-4 h-4" /> Afternoon Shift
                            </p>
                            <div className="space-y-2 pl-6 text-sm">
                                <p>
                                    <span className="text-gray-600">In:</span>{" "}
                                    <span className="font-medium">
                                        {formatTime(schedule.pm_time_in)}
                                    </span>
                                </p>
                                <p>
                                    <span className="text-gray-600">Out:</span>{" "}
                                    <span className="font-medium">
                                        {formatTime(schedule.pm_time_out)}
                                    </span>
                                </p>
                                <p>
                                    <span className="text-gray-600">
                                        Grace Period:
                                    </span>{" "}
                                    <span className="font-medium">
                                        {schedule.pm_grace_period_minutes} mins
                                    </span>
                                </p>
                                <p>
                                    <span className="text-gray-600">
                                        Undertime Grace:
                                    </span>{" "}
                                    <span className="font-medium">
                                        {schedule.pm_undertime_grace_minutes}{" "}
                                        mins
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Requirements
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Requirement
                            label="AM Photo"
                            required={schedule.am_require_photo_in}
                            color="blue"
                        />
                        <Requirement
                            label="PM Photo"
                            required={schedule.pm_require_photo_in}
                            color="blue"
                        />
                        <Requirement
                            label="AM Location"
                            required={schedule.am_require_location_in}
                            color="purple"
                        />
                        <Requirement
                            label="PM Location"
                            required={schedule.pm_require_location_in}
                            color="purple"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
