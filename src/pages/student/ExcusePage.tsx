import { Button } from "@/components/ui/button"
import { useExcuses } from "@/features/shared/api/excuseApi"
import { Link } from "react-router-dom"
import { type ColumnDef } from "@tanstack/react-table"
import type {
    ExcuseQuery,
    ExcuseResponse,
} from "@/features/shared/api/excuseApi"
import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import DataTable from "@/features/shared/components/Datatable"
import { useState } from "react"
import { File, Image } from "lucide-react"
import { ExcuseModal } from "@/features/shared/components/ExcuseModal"
import { useUser } from "@/features/auth/hooks/useUser"
import { isStudent } from "@/features/auth/types/auth"

const getExcuseColumns = (
    onRowClick: (excuse: ExcuseResponse) => void
): ColumnDef<ExcuseResponse>[] => [
    {
        accessorKey: "title",
        header: "Title",
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
    {
        accessorKey: "attachments",
        header: "Attachments",
        cell: ({ row }) => {
            const attachments = row.original.attachments || []

            if (!attachments.length) return "-"

            const fileCount = attachments.filter(
                (a) => a.type === "file"
            ).length
            const imageCount = attachments.filter(
                (a) => a.type === "image"
            ).length

            return (
                <div className="flex gap-4 items-center">
                    {fileCount > 0 && (
                        <div className="flex items-center gap-1">
                            <File className="w-4 h-4 text-gray-600" />
                            <span className="text-sm">{fileCount}</span>
                        </div>
                    )}
                    {imageCount > 0 && (
                        <div className="flex items-center gap-1">
                            <Image className="w-4 h-4 text-gray-600" />
                            <span className="text-sm">{imageCount}</span>
                        </div>
                    )}
                </div>
            )
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
            <Button
                variant="outline"
                size="sm"
                onClick={() => onRowClick(row.original)}
            >
                View
            </Button>
        ),
    },
]

export const ExcusePage = () => {
    const { data: user } = useUser()
    const studentId =
        user && isStudent(user?.user) ? user.user.student.id : undefined
    const [filters, setFilters] = useState<ExcuseQuery>({
        page: 1,
        per_page: 10,
        student_id: studentId,
    })
    const { data, isLoading } = useExcuses(filters)

    const [modalOpen, setModalOpen] = useState(false)
    const [selectedExcuse, setSelectedExcuse] = useState<ExcuseResponse | null>(
        null
    )

    const handleRowClick = (excuse: ExcuseResponse) => {
        setSelectedExcuse(excuse)
        setModalOpen(true)
    }

    const columns = getExcuseColumns(handleRowClick)

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">Excuses</h1>
                <Button asChild>
                    <Link to="/student/excuse/create">
                        File Excused Absence
                    </Link>
                </Button>
            </div>

            <ScrollArea type="always" className="w-full overflow-x-auto">
                <DataTable
                    data={data?.data ?? []}
                    columns={columns}
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

            <ExcuseModal
                open={modalOpen}
                onOpenChange={setModalOpen}
                excuse={selectedExcuse ?? undefined}
                showActions={false}
            />
        </div>
    )
}

export default ExcusePage
