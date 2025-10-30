import type { ColumnDef } from "@tanstack/react-table"
import { Link } from "react-router-dom"
import type { Student } from "@/types/studentList"

export const CompanyStudentColumns: ColumnDef<Student>[] = [
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
                    {name}
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
