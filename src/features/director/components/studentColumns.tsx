import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"

import type { Student } from "@/types/studentList"
import { Checkbox } from "@/components/ui/checkbox"
import { Link } from "react-router-dom"

export const StudentColumns: ColumnDef<Student>[] = [
    {
        id: "select",
        size: 40,
        header: ({ table }) => (
            <Checkbox
                aria-label="Select all"
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                aria-label="Select row"
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "user.name",
        header: "Name",
        cell: ({ row }) => {
            const studentId = row.original.id
            const name = row.original.user?.name || "Unknown"

            return (
                <Link
                    to={`/director/students/${studentId}`}
                    className="text-blue-700 hover:underline"
                >
                    {name} {studentId}
                </Link>
            )
        },
    },
    {
        accessorKey: "user.email",
        header: "Email",
        cell: ({ row }) => <span>{row.original.user?.email}</span>,
    },
    {
        accessorKey: "program.name",
        header: "Program",
        cell: ({ row }) => {
            const program = row.original.program
            return (
                <span title={program?.name || "N/A"}>
                    {program?.code || "N/A"}
                </span>
            )
        },
    },
    {
        accessorKey: "company.name",
        header: "Company",
        cell: ({ row }) => {
            const company = row.original.company
            return (
                <span title={company?.name || ""}>{company?.name || ""}</span>
            )
        },
    },
    {
        accessorKey: "advisor.user.name",
        header: "Advisor",
        cell: ({ row }) => {
            const advisor = row.original.advisor
            return (
                <span title={advisor?.user?.name || ""}>
                    {advisor?.user?.name || ""}
                </span>
            )
        },
    },
    {
        accessorKey: "user.status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.user?.status
            const color =
                status === "accepted"
                    ? "bg-green-100 text-green-800"
                    : status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : status === "rejected"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
            return <Badge className={color}>{status}</Badge>
        },
    },
    {
        accessorKey: "created_at",
        header: "Joined At",
        cell: ({ row }) => {
            const createdAt = new Date(
                row.original.user.created_at
            ).toLocaleDateString()
            return <span>{createdAt}</span>
        },
    },
]
