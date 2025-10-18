import type { ColumnDef } from "@tanstack/react-table"

import type { Student } from "@/types/studentList"

export const AgentStudentColumns: ColumnDef<Student>[] = [
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
]
