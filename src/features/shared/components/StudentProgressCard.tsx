import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, AlertCircle } from "lucide-react"
import type { StudentResponse } from "../api/studentApi"

export default function StudentProgressCard({
    student,
}: {
    student: StudentResponse
}) {
    const s = student.data
    const remainingHours = Math.max(
        (s.required_hours ?? 0) - (s.hours_attended ?? 0),
        0
    )
    const progressPercent = typeof s.completion === "number" ? s.completion : 0

    return (
        <Card>
            <CardHeader>
                <CardTitle>Student Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-medium text-gray-900">
                            Overall Progress
                        </h2>
                        <span className="text-2xl font-semibold text-blue-600">
                            {progressPercent}%
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                            className="bg-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
                            style={{
                                width: `${Math.min(progressPercent, 100)}%`,
                            }}
                        />
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-gray-500 mb-1">
                                Hours Completed
                            </p>
                            <p className="text-2xl font-semibold text-gray-900">
                                {s.hours_attended}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 mb-1">
                                Hours Remaining
                            </p>
                            <p className="text-2xl font-semibold text-gray-900">
                                {remainingHours}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <MetricCard
                        icon={<Calendar className="w-5 h-5 text-green-600" />}
                        label="Start Date"
                        value={s.ojt_start_date ?? "—"}
                        bgColor="bg-green-50"
                    />
                    <MetricCard
                        icon={<Calendar className="w-5 h-5 text-orange-600" />}
                        label="End Date"
                        value={s.ojt_end_date ?? "—"}
                        bgColor="bg-orange-50"
                    />
                    <MetricCard
                        icon={<Clock className="w-5 h-5 text-blue-600" />}
                        label="Required Hours"
                        value={s.effective_required_hours}
                        bgColor="bg-blue-50"
                    />
                    <MetricCard
                        icon={<AlertCircle className="w-5 h-5 text-red-600" />}
                        label="Total Absences"
                        value={s.total_absences_count}
                        bgColor="bg-red-50"
                    />
                </div>
            </CardContent>
        </Card>
    )
}

function MetricCard({
    icon,
    label,
    value,
    bgColor,
}: {
    icon: React.ReactNode
    label: string
    value: string | number
    bgColor: string
}) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div
                className={`${bgColor} w-10 h-10 rounded-lg flex items-center justify-center mb-3`}
            >
                {icon}
            </div>
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <p className="text-xl font-semibold text-gray-900">{value}</p>
        </div>
    )
}
