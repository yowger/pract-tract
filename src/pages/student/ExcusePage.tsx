import { Button } from "@/components/ui/button"
import { useExcuses } from "@/features/shared/api/excuseApi"
import { Link } from "react-router-dom"
import { type ColumnDef } from "@tanstack/react-table"
import type { ExcuseResponse } from "@/features/shared/api/excuseApi"
import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import DataTable from "@/features/shared/components/Datatable"
import { useState } from "react"

const ExcuseColumns: ColumnDef<ExcuseResponse>[] = [
    {
        accessorKey: "student.student_id",
        header: "Student ID",
        cell: ({ row }) => row.original.student?.student_id ?? "-",
    },
    {
        accessorKey: "reason",
        header: "Reason",
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => row.original.description || "-",
    },
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) =>
            new Date(row.original.date).toLocaleDateString("en-US"),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <Badge>{row.original.status}</Badge>,
    },
    // {
    //     id: "actions",
    //     header: "Actions",
    //     cell: ({ row }) => (
    //         <Button asChild variant="outline" size="sm">
    //             <Link to={`/student/excuse/${row.original.id}`}>View</Link>
    //         </Button>
    //     ),
    // },
]

export const ExcusePage = () => {
    const [filters, setFilters] = useState({
        page: 1,
        per_page: 10,
    })

    const { data, isLoading } = useExcuses(filters)

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">Excuses</h1>
                <Button asChild>
                    <Link to="/student/excuse/create">Create Excuse</Link>
                </Button>
            </div>

            <ScrollArea type="always" className="w-full overflow-x-auto">
                <DataTable
                    data={data?.data ?? []}
                    columns={ExcuseColumns}
                    isLoading={isLoading}
                    manualPagination
                    pagination={{
                        pageIndex: filters.page - 1,
                        pageSize: filters.per_page,
                    }}
                    onPageChange={(p) =>
                        setFilters((f) => ({ ...f, page: p + 1 }))
                    }
                    onPageSizeChange={(size) =>
                        setFilters((f) => ({ ...f, per_page: size }))
                    }
                />
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}

export default ExcusePage
