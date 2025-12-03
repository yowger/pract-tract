import { format, parse, parseISO } from "date-fns"
import type { ColumnDef } from "@tanstack/react-table"
import type { AttendanceWithStudent } from "@/features/shared/api/attendanceApi"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

function formatTime(time: string | null) {
    if (!time) return ""

    try {
        const date = time.includes("T")
            ? parseISO(time)
            : parse(time, "HH:mm:ss", new Date())

        return format(date, "hh:mm a")
    } catch {
        return time
    }
}

const statusColors: Record<string, string> = {
    present: "",
    late: "text-amber-600",
    undertime: "text-orange-600",
    absent: "text-rose-600",
}

export const AgentAttendanceColumns: ColumnDef<AttendanceWithStudent>[] = [
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => (
            <span>{format(new Date(row.original.date), "MMM d, yyyy")}</span>
        ),
    },
    {
        accessorKey: "student.student_name",
        header: "Student Name",
        cell: ({ row }) => row.original.student.user.name,
    },
    {
        id: "am_session",
        header: "AM",
        cell: ({ row }) => {
            const { am_time_in, am_time_out, am_status } = row.original
            const status = am_status ?? "null"
            const colorClass = statusColors[status] || statusColors.null

            const timeRange =
                am_time_in || am_time_out
                    ? `${formatTime(am_time_in)} – ${formatTime(am_time_out)}`
                    : ""

            return (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <span className={`cursor-help ${colorClass}`}>
                            {timeRange}
                        </span>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                        <div className="text-xs">
                            <p>
                                <strong>Status:</strong> {status}
                            </p>
                            <p>
                                <strong>In:</strong>
                                {formatTime(am_time_in)}
                            </p>
                            <p>
                                <strong>Out:</strong>
                                {formatTime(am_time_out)}
                            </p>
                        </div>
                    </TooltipContent>
                </Tooltip>
            )
        },
    },
    {
        id: "pm_session",
        header: "PM",
        cell: ({ row }) => {
            const { pm_time_in, pm_time_out, pm_status } = row.original
            const status = pm_status ?? "null"
            const colorClass = statusColors[status] || statusColors.null

            const timeRange =
                pm_time_in || pm_time_out
                    ? `${formatTime(pm_time_in)} – ${formatTime(pm_time_out)}`
                    : ""

            return (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <span className={`cursor-help ${colorClass}`}>
                            {timeRange}
                        </span>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                        <div className="text-xs">
                            <p>
                                <strong>Status:</strong> {status}
                            </p>
                            <p>
                                <strong>In:</strong>
                                {formatTime(pm_time_in)}
                            </p>
                            <p>
                                <strong>Out:</strong> {formatTime(pm_time_out)}
                            </p>
                        </div>
                    </TooltipContent>
                </Tooltip>
            )
        },
    },
    {
        id: "duration",
        header: "Duration",
        cell: ({ row }) => {
            const mins = row.original.duration_minutes
            if (mins == null || isNaN(mins)) return <span>-</span>

            const hours = Math.floor(mins / 60)
            const minutes = mins % 60

            const formatted =
                hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`

            return <span>{formatted}</span>
        },
    },
    {
        id: "remarks",
        header: "Remarks",
        cell: ({ row }) => row.original.remarks || <span></span>,
    },

    // {
    //     accessorKey: "remarks",
    //     header: "Remarks",
    //     cell: ({ row }) => row.original.remarks,
    // },
    {
        id: "photo",
        header: "Photo",
        cell: ({ row }) => {
            const { am_photo_in, am_photo_out, pm_photo_in, pm_photo_out } =
                row.original

            const photos = [
                { src: am_photo_in, label: "AM In" },
                { src: am_photo_out, label: "AM Out" },
                { src: pm_photo_in, label: "PM In" },
                { src: pm_photo_out, label: "PM Out" },
            ].filter((p): p is { src: string; label: string } => !!p.src)

            if (photos.length === 0) {
                return <span className="text-gray-400 text-sm">No photo</span>
            }

            return (
                <div className="flex -space-x-2 overflow-hidden">
                    {photos.map((p, i) => (
                        <img
                            key={i}
                            src={p.src}
                            alt={p.label}
                            title={p.label}
                            className="w-10 h-10 object-cover rounded-full border-2 border-white cursor-pointer"
                            onClick={() => window.open(p.src, "_blank")}
                        />
                    ))}
                </div>
            )
        },
    },

    // {
    //     id: "actions",
    //     header: "Actions",
    //     cell: () => (
    //         <button className="text-blue-600 hover:underline text-sm">
    //             View
    //         </button>
    //     ),
    // },
]
