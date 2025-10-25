import type { ColumnDef } from "@tanstack/react-table"

import type { Student } from "@/types/studentList"

export const CompanyStudentColumns: ColumnDef<Student>[] = [
    {
        accessorKey: "user.name",
        header: "Name",
        cell: ({ row }) => <span>{row.original.user?.name}</span>,
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
