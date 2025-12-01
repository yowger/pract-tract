import { useUser } from "@/features/auth/hooks/useUser"
import { isStudent } from "@/features/auth/types/auth"
import { useStudent } from "@/features/shared/hooks/useStudent"
import { Calendar, Clock, AlertCircle } from "lucide-react"

export default function StudentDashboard() {
    const { data: user } = useUser()
    const studentId =
        user && isStudent(user?.user) ? user.user.student.id : null

    const { data: studentData, isLoading } = useStudent(Number(studentId))

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-gray-600">
                        Loading your dashboard...
                    </p>
                </div>
            </div>
        )
    }

    if (!studentData) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">No data available</p>
                </div>
            </div>
        )
    }

    const s = studentData.data
    const remainingHours = Math.max(
        (s.required_hours ?? 0) - (s.hours_attended ?? 0),
        0
    )
    const progressPercent = typeof s.completion === "number" ? s.completion : 0

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-normal text-gray-900 mb-1">
                        Welcome back, {s.user.name.split(" ")[0]}
                    </h1>
                    <p className="text-sm text-gray-600">
                        Track your OJT progress and milestones
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                        Student Information
                    </h2>
                    <div className="space-y-3">
                        <InfoRow label="Full Name" value={s.user.name} />
                        <InfoRow label="Student ID" value={s.id} />
                        <InfoRow
                            label="Status"
                            value={
                                <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                        progressPercent >= 100
                                            ? "bg-green-100 text-green-800"
                                            : "bg-blue-100 text-blue-800"
                                    }`}
                                >
                                    {progressPercent >= 100
                                        ? "Completed"
                                        : "In Progress"}
                                </span>
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
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

function InfoRow({
    label,
    value,
}: {
    label: string
    value: string | number | React.ReactNode
}) {
    return (
        <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
            <span className="text-sm text-gray-600">{label}</span>
            <span className="text-sm font-medium text-gray-900">{value}</span>
        </div>
    )
}
