import React, { useState } from "react"
import {
    CheckCircle2,
    XCircle,
    Clock,
    FileCheck,
    LogOut,
    Calendar,
} from "lucide-react"
import type { AttendanceChartsResponse } from "../api/attendanceApi"

interface StudentChartsProps {
    charts: AttendanceChartsResponse
}

const StudentCharts: React.FC<StudentChartsProps> = ({ charts }) => {
    const [selectedMetric, setSelectedMetric] = useState<"all" | string>("all")

    // Calculate totals and attendance rate
    const totals = charts.lineData.reduce(
        (acc, day) => ({
            present: acc.present + day.present,
            absent: acc.absent + day.absent,
            late: acc.late + day.late,
            excused: acc.excused + day.excused,
            undertime: acc.undertime + day.undertime,
        }),
        { present: 0, absent: 0, late: 0, excused: 0, undertime: 0 }
    )

    const totalDays = totals.present + totals.absent
    const attendanceRate =
        totalDays > 0 ? (totals.present / totalDays) * 100 : 0

    const metrics = [
        {
            key: "present",
            label: "Present",
            value: totals.present,
            icon: CheckCircle2,
            color: "text-emerald-600",
            bgColor: "bg-emerald-50",
            borderColor: "border-emerald-200",
        },
        {
            key: "absent",
            label: "Absent",
            value: totals.absent,
            icon: XCircle,
            color: "text-red-600",
            bgColor: "bg-red-50",
            borderColor: "border-red-200",
        },
        {
            key: "late",
            label: "Late",
            value: totals.late,
            icon: Clock,
            color: "text-orange-600",
            bgColor: "bg-orange-50",
            borderColor: "border-orange-200",
        },
        {
            key: "excused",
            label: "Excused",
            value: totals.excused,
            icon: FileCheck,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
            borderColor: "border-blue-200",
        },
        {
            key: "undertime",
            label: "Undertime",
            value: totals.undertime,
            icon: LogOut,
            color: "text-purple-600",
            bgColor: "bg-purple-50",
            borderColor: "border-purple-200",
        },
    ]

    const getRowStyle = (day: (typeof charts.lineData)[0]) => {
        if (day.absent > 0) return "bg-red-50 hover:bg-red-100"
        if (day.late > 2) return "bg-orange-50 hover:bg-orange-100"
        return "bg-white hover:bg-gray-50"
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">
                        Attendance Summary
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Track daily attendance metrics
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-bold text-emerald-600">
                        {attendanceRate.toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                        Attendance Rate
                    </div>
                </div>
            </div>

            {/* Metrics Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {metrics.map((metric) => {
                    const Icon = metric.icon
                    const isSelected = selectedMetric === metric.key
                    return (
                        <button
                            key={metric.key}
                            onClick={() =>
                                setSelectedMetric(
                                    isSelected ? "all" : metric.key
                                )
                            }
                            className={`p-4 rounded-lg border-2 transition-all text-left ${
                                isSelected
                                    ? `${metric.bgColor} ${metric.borderColor} shadow-sm`
                                    : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm"
                            }`}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <div
                                    className={`p-1.5 rounded ${metric.bgColor}`}
                                >
                                    <Icon
                                        className={`w-4 h-4 ${metric.color}`}
                                    />
                                </div>
                                <span className="text-xs font-medium text-gray-500 uppercase">
                                    {metric.label}
                                </span>
                            </div>
                            <div
                                className={`text-2xl font-bold ${metric.color}`}
                            >
                                {metric.value}
                            </div>
                        </button>
                    )
                })}
            </div>

            {/* Attendance Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    Date
                                </div>
                            </th>
                            {metrics.map((metric) => {
                                const Icon = metric.icon
                                const isHighlighted =
                                    selectedMetric === metric.key ||
                                    selectedMetric === "all"
                                return (
                                    <th
                                        key={metric.key}
                                        className={`px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider ${
                                            isHighlighted
                                                ? metric.color
                                                : "text-gray-400"
                                        }`}
                                    >
                                        <div className="flex items-center justify-center gap-1.5">
                                            <Icon className="w-4 h-4" />
                                            <span className="hidden sm:inline">
                                                {metric.label}
                                            </span>
                                            <span className="sm:hidden">
                                                {metric.label.slice(0, 3)}
                                            </span>
                                        </div>
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {charts.lineData.map((day) => (
                            <tr
                                key={day.date}
                                className={`transition-colors ${getRowStyle(
                                    day
                                )}`}
                            >
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {new Date(day.date).toLocaleDateString(
                                        "en-US",
                                        {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        }
                                    )}
                                </td>
                                {metrics.map((metric) => (
                                    <td
                                        key={metric.key}
                                        className="px-4 py-3 text-center"
                                    >
                                        <span
                                            className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-semibold text-sm ${
                                                (selectedMetric ===
                                                    metric.key ||
                                                    selectedMetric === "all") &&
                                                Number(
                                                    day[
                                                        metric.key as keyof typeof day
                                                    ]
                                                ) > 0
                                                    ? `${metric.bgColor.replace(
                                                          "bg-",
                                                          "bg-"
                                                      )} ${metric.color}`
                                                    : "text-gray-600"
                                            }`}
                                        >
                                            {
                                                day[
                                                    metric.key as keyof typeof day
                                                ]
                                            }
                                        </span>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500 px-2">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-100 border-2 border-red-500"></div>
                        <span>High absence days</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-orange-100 border-2 border-orange-500"></div>
                        <span>High tardiness</span>
                    </div>
                </div>
                <div>Showing {charts.lineData.length} days</div>
            </div>
        </div>
    )
}

export default StudentCharts
