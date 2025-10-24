import { format, parseISO } from "date-fns"
import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import type { AttendanceWithStudent } from "@/features/shared/api/attendanceApi"

function formatTime(time: string | null) {
    if (!time) return "-"
    try {
        return format(parseISO(time), "hh:mm a")
    } catch {
        return time
    }
}

export const AgentAttendanceColumns: ColumnDef<AttendanceWithStudent>[] = [
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => {
            const date = row.original.date
            return <span>{format(new Date(date), "MMM d, yyyy")}</span>
        },
    },
    {
        accessorKey: "student.student_name",
        header: "Student Name",
        cell: ({ row }) => row.original.student.user.name,
    },
    {
        accessorKey: "am_status",
        header: "AM",
        cell: ({ row }) => {
            const status = row.original.am_status
            return (
                <Badge
                    variant={
                        status === "present"
                            ? "default"
                            : status === "late"
                            ? "outline"
                            : "secondary"
                    }
                >
                    {status ? status.toUpperCase() : "-"}
                </Badge>
            )
        },
    },
    {
        accessorKey: "pm_status",
        header: "PM",
        cell: ({ row }) => {
            const status = row.original.pm_status
            return (
                <Badge
                    variant={
                        status === "present"
                            ? "default"
                            : status === "late"
                            ? "outline"
                            : "secondary"
                    }
                >
                    {status ? status.toUpperCase() : "-"}
                </Badge>
            )
        },
    },
    {
        accessorKey: "am_time_in",
        header: "AM In",
        cell: ({ row }) => formatTime(row.original.am_time_in),
    },
    {
        accessorKey: "am_time_out",
        header: "AM Out",
        cell: ({ row }) => formatTime(row.original.am_time_out),
    },
    {
        accessorKey: "pm_time_in",
        header: "PM In",
        cell: ({ row }) => formatTime(row.original.pm_time_in),
    },
    {
        accessorKey: "pm_time_out",
        header: "PM Out",
        cell: ({ row }) => formatTime(row.original.pm_time_out),
    },
    {
        id: "duration",
        header: "Duration",
        cell: ({ row }) => <span>{row.original.duration_minutes}</span>,
    },
    {
        accessorKey: "remarks",
        header: "Remarks",
        cell: ({ row }) => row.original.remarks || "-",
    },
    {
        id: "actions",
        header: "Actions",
        cell: () => (
            <button className="text-blue-600 hover:underline text-sm">
                View
            </button>
        ),
    },
]
