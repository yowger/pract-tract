import { type ColumnDef } from "@tanstack/react-table"

import type { Company } from "@/features/director/api/companiesApi"
import { Link } from "react-router-dom"

export const CompanyColumns: ColumnDef<Company>[] = [
    {
        header: "Name",
        cell: ({ row }) => {
            const company = row.original
            const name = company.name

            return (
                <Link
                    to={`/director/companies/${company.id}`}
                    className="text-blue-700 hover:underline"
                >
                    {name}
                </Link>
            )
        },
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
        header: "Evaluations",
        accessorFn: (row) =>
            row.owner_evaluations.length > 0
                ? row.owner_evaluations.map((ev) => ev.name).join(", ")
                : "-",
    },
]
