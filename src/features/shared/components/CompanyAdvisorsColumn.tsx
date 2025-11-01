import { type ColumnDef } from "@tanstack/react-table"
import type { Advisor } from "@/features/director/api/advisorsApi"
// import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Link } from "react-router-dom"

export const AdvisorColumns: ColumnDef<Advisor>[] = [
    {
        accessorKey: "user.name",
        header: "Name",
        cell: ({ row }) => {
            const advisorId = row.original.id
            const name = row.original.user?.name || "Unknown"

            return (
                <Link
                    to={`/director/advisors/${advisorId}`}
                    className="text-blue-700 hover:underline"
                >
                    {name}
                </Link>
            )
        },
    },
    {
        accessorKey: "user.email",
        header: "Email",
        cell: ({ row }) => row.original.user?.email ?? "—",
    },
    // {
    //     accessorKey: "user.status",
    //     header: "Status",
    //     cell: ({ row }) => {
    //         const status = row.original.user?.status ?? "unknown"
    //         const isActive = row.original.user?.is_active

    //         return (
    //             <Badge
    //                 variant={
    //                     isActive
    //                         ? "success"
    //                         : status === "pending"
    //                         ? "secondary"
    //                         : "destructive"
    //                 }
    //             >
    //                 {isActive
    //                     ? "Active"
    //                     : status === "pending"
    //                     ? "Pending"
    //                     : "Inactive"}
    //             </Badge>
    //         )
    //     },
    // },
    {
        accessorKey: "students_count",
        header: "Students",
        cell: ({ row }) => row.original.students_count ?? 0,
    },
    {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }) =>
            format(new Date(row.original.created_at), "MMM d, yyyy"),
    },
]
