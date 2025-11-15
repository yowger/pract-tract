import { useState } from "react"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import DataTable from "./Datatable"
import {
    useApproveExcuse,
    useExcuses,
    useRejectExcuse,
    type ExcuseQuery,
    type ExcuseResponse,
} from "../api/excuseApi"
import type { ColumnDef } from "@tanstack/react-table"
import { File, Image } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ExcuseModal } from "./ExcuseModal"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

const getExcuseColumns = (
    onRowClick: (excuse: ExcuseResponse) => void
): ColumnDef<ExcuseResponse>[] => [
    {
        accessorKey: "student_name",
        header: "Name",
        cell: ({ row }) => row.original.student.user?.name || "",
    },
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => row.original.description || "",
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

            if (!attachments.length) return ""

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

const CompanyStudentExcusesCard = ({ companyId }: { companyId: number }) => {
    const [filters, setFilters] = useState<ExcuseQuery>({
        page: 1,
        per_page: 10,
        company_id: companyId,
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

    const { mutateAsync: approveExcuse } = useApproveExcuse()
    const { mutateAsync: rejectExcuse } = useRejectExcuse()

    const columns = getExcuseColumns(handleRowClick)

    return (
        <>
            <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
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
            </div>

            <ExcuseModal
                open={modalOpen}
                onOpenChange={setModalOpen}
                showActions={false}
                excuse={selectedExcuse ?? undefined}
                onApprove={(excuse) => {
                    try {
                        approveExcuse(excuse.id)

                        toast.success("Excuse approved successfully.")

                        setModalOpen(false)
                    } catch (error) {
                        if (error instanceof Error) {
                            toast.error(
                                "Failed to approve excuse. Please try again."
                            )
                        }
                    }
                }}
                onReject={(excuse) => {
                    try {
                        rejectExcuse(excuse.id)

                        toast.success("Excuse rejected successfully.")
                    } catch (error) {
                        if (error instanceof Error) {
                            toast.error(
                                "Failed to reject excuse. Please try again."
                            )
                        }
                    }
                }}
            />
        </>
    )
}

export default CompanyStudentExcusesCard
