import { type ColumnDef } from "@tanstack/react-table"

import type { Company } from "@/features/director/api/companiesApi"

export const CompanyColumns: ColumnDef<Company>[] = [
    {
        header: "Name",
        accessorKey: "name",
    },
    {
        header: "Company Email",
        accessorKey: "email",
    },
    {
        header: "Phone",
        accessorKey: "phone",
    },
    {
        header: "Address",
        accessorKey: "address",
    },
    {
        header: "Active",
        accessorKey: "is_active",
        cell: ({ row }) => (row.original.is_active ? "Yes" : "No"),
    },
    {
        header: "Owner",
        accessorFn: (row) => row.owner?.name || "-",
    },
    {
        header: "Owner Email",
        accessorFn: (row) => row.owner?.email || "-",
    },
    {
        header: "Students",
        accessorKey: "students_count",
    },
]
