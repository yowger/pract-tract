import { type ColumnDef } from "@tanstack/react-table"

import type { Company } from "@/features/director/api/companiesApi"
import { Link } from "react-router-dom"
import { Eye } from "lucide-react"

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
    {
        header: "Action",
        cell: ({ row }) => {
            const company = row.original
            return (
                <Link
                    to={`/director/companies/${company.id}`}
                    className="text-primary hover:underline flex items-center gap-1"
                >
                    <Eye className="w-4 h-4" />
                </Link>
            )
        },
    },
]
