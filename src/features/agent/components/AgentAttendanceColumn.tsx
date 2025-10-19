import { format, differenceInMinutes, parseISO } from "date-fns"
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

function calculateDuration(row: AttendanceWithStudent) {
    const start = row.am_time_in || row.pm_time_in
    const end = row.pm_time_out || row.am_time_out

    if (!start || !end) return "-"

    try {
        const startDate = parseISO(start)
        const endDate = parseISO(end)
        const diff = differenceInMinutes(endDate, startDate)
        if (diff < 0) return "-"
        const hours = Math.floor(diff / 60)
        const minutes = diff % 60
        return `${hours}h ${minutes}m`
    } catch {
        return "-"
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
        cell: ({ row }) => <span>{calculateDuration(row.original)}</span>,
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
