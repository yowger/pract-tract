import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"

import type { Student } from "@/types/studentList"

export const StudentColumns: ColumnDef<Student>[] = [
    {
        accessorKey: "user.name",
        header: "Name",
        cell: ({ row }) => <span>{row.original.user?.name}</span>,
    },
    {
        accessorKey: "program.name",
        header: "Program",
        cell: ({ row }) => <span>{row.original.program?.name || "N/A"}</span>,
    },
    {
        accessorKey: "user.email",
        header: "Email",
        cell: ({ row }) => <span>{row.original.user?.email}</span>,
    },
    {
        accessorKey: "user.status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.user?.status
            const color =
                status === "Accepted"
                    ? "bg-green-100 text-green-800"
                    : status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"

            return <Badge className={color}>{status}</Badge>
        },
    },
]
