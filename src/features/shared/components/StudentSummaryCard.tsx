import React from "react"
import {
    Clock,
    Target,
    CalendarX,
    TrendingUp,
    CheckCircle2,
} from "lucide-react"
import { Card, CardHeader } from "@/components/ui/card"

interface StudentSummaryCardProps {
    student: {
        data: {
            hours_attended: number
            effective_required_hours: number
            total_absences_count: number
            completion: number
        }
    }
}

const StudentSummaryCard: React.FC<StudentSummaryCardProps> = ({ student }) => {
    const stats = [
        {
            label: "Hours Attended",
            value: student.data.hours_attended,
            icon: Clock,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
            total: student.data.effective_required_hours,
            showProgress: true,
        },
        {
            label: "Required Hours",
            value: student.data.effective_required_hours,
            icon: Target,
            color: "text-purple-600",
            bgColor: "bg-purple-50",
        },
        {
            label: "Total Absences",
            value: `${student.data.total_absences_count} Days`,
            icon: CalendarX,
            color: "text-orange-600",
            bgColor: "bg-orange-50",
        },
        {
            label: "Completion",
            value: `${student.data.completion.toFixed(1)}%`,
            icon: TrendingUp,
            color: "text-emerald-600",
            bgColor: "bg-emerald-50",
            isPercentage: true,
        },
    ]

    const progressPercentage =
        (student.data.hours_attended / student.data.effective_required_hours) *
        100
    const isNearComplete = progressPercentage >= 90
    const isComplete = progressPercentage >= 100

    return (
        <Card className="w-full overflow-hidden">
            <CardHeader className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                    Student Summary
                </h3>
                {isComplete ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-600 text-white rounded-full text-xs font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Completed
                    </span>
                ) : isNearComplete ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Almost Complete
                    </span>
                ) : null}
            </CardHeader>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                        <div
                            key={index}
                            className={`p-6 ${
                                index !== stats.length - 1
                                    ? "border-b sm:border-b-0 sm:border-r border-gray-100"
                                    : ""
                            } ${index === 1 ? "lg:border-r" : ""} ${
                                index === 2 ? "sm:border-r-0 lg:border-r" : ""
                            } hover:bg-gray-50 transition-colors`}
                        >
                            <div className="flex items-start gap-3">
                                <div
                                    className={`p-2.5 rounded-lg ${stat.bgColor} flex-shrink-0`}
                                >
                                    <Icon className={`w-5 h-5 ${stat.color}`} />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                        {stat.label}
                                    </p>
                                    <p
                                        className={`text-2xl font-bold ${stat.color} mb-1`}
                                    >
                                        {stat.value}
                                    </p>

                                    {stat.showProgress && (
                                        <div className="mt-2">
                                            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                                                <span>Progress</span>
                                                <span className="font-medium">
                                                    {progressPercentage.toFixed(
                                                        1
                                                    )}
                                                    %
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-500 ${
                                                        progressPercentage >= 90
                                                            ? "bg-emerald-500"
                                                            : progressPercentage >=
                                                              70
                                                            ? "bg-blue-500"
                                                            : "bg-orange-500"
                                                    }`}
                                                    style={{
                                                        width: `${Math.min(
                                                            progressPercentage,
                                                            100
                                                        )}%`,
                                                    }}
                                                />
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {stat.total -
                                                    student.data
                                                        .hours_attended}{" "}
                                                hours remaining
                                            </p>
                                        </div>
                                    )}

                                    {stat.isPercentage && (
                                        <div className="mt-2">
                                            <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                                                <div
                                                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                                                    style={{
                                                        width: `${student.data.completion}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Card>
    )
}

export default StudentSummaryCard
