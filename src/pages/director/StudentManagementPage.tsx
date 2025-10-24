import { AxiosError } from "axios"
import { useState } from "react"
import { toast } from "sonner"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import DataTable from "@/features/shared/components/Datatable"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { StudentColumns } from "@/features/director/components/StudentColumns"
import {
    useStudents,
    // useUpdateStudentsAdvisor,
    useUpdateStudentsCompany,
} from "@/features/director/hooks/useStudents"
import type { StudentQueryParams } from "@/features/director/api/studentApi"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useUpdateUsersStatus } from "@/features/director/hooks/useUpdateUsersStatus"
import type { UserStatus } from "@/features/shared/types/users"
import { useCompanyOptions } from "@/features/shared/hooks/useCompany"

const StudentManagementPage = () => {
    const [selectedStudentsIds, setSelectedStudentsIds] = useState<number[]>([])
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false)
    const [isCompanyModalOpen, setCompanyModalOpen] = useState(false)
    const { data: companies } = useCompanyOptions()
    const [newStatus, setNewStatus] = useState<UserStatus | "">("")
    const [selectedCompanyId, setSelectedCompanyId] = useState<number | "">("")
    // const [selectedAdvisorId, setSelectedAdvisorId] = useState<number | "">("")
    const { mutateAsync: bulkUpdate, isPending } = useUpdateUsersStatus()
    const { mutateAsync: updateCompany } = useUpdateStudentsCompany()
    // const { mutateAsync: updateAdvisor } = useUpdateStudentsAdvisor()
    const [filters, setFilters] = useState<StudentQueryParams>({
        page: 1,
        per_page: 10,
        student: "",
        status: "",
        program_id: undefined as number | undefined,
    })

    const { data: students, isLoading } = useStudents(filters)

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setFilters((f) => ({
            ...f,
            student: value,
            page: 1,
        }))
    }

    const handleStatusChange = (value: string) => {
        setFilters((f) => ({
            ...f,
            status: value === "all" ? "" : value,
            page: 1,
        }))
    }

    const handleNewStatusChange = (value: string) => {
        setNewStatus(
            value as "" | "accepted" | "pending" | "rejected" | "inactive"
        )
    }

    const handleBulkUpdate = async () => {
        if (!newStatus || selectedStudentsIds.length === 0 || isPending) return

        try {
            await bulkUpdate({
                user_ids: selectedStudentsIds,
                status: newStatus,
            })

            toast.success("Status updated successfully")
            setIsStatusModalOpen(false)
            setSelectedStudentsIds([])
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(
                    error?.response?.data?.message || "Status update failed"
                )
            }
        }
    }

    const handleBulkUpdateCompany = async () => {
        if (!selectedCompanyId || selectedStudentsIds.length === 0) return

        try {
            await updateCompany({
                user_ids: selectedStudentsIds,
                company_id: selectedCompanyId,
            })

            toast.success("Company assigned successfully")
            setCompanyModalOpen(false)
            setSelectedStudentsIds([])
            setSelectedCompanyId("")
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error("Failed to assign company")
            }
        }
    }

    return (
        <>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <div>
                        <Input
                            placeholder="Search student..."
                            value={filters.student}
                            onChange={handleSearch}
                            className="w-[200px]"
                        />
                    </div>

                    <div className="flex gap-3 items-center">
                        {selectedStudentsIds.length > 0 && (
                            <Button onClick={() => setIsStatusModalOpen(true)}>
                                Update Status ({selectedStudentsIds.length})
                            </Button>
                        )}

                        {selectedStudentsIds.length > 0 && (
                            <Button onClick={() => setCompanyModalOpen(true)}>
                                Assign Company ({selectedStudentsIds.length})
                            </Button>
                        )}

                        <Select
                            value={filters.status || "all"}
                            onValueChange={handleStatusChange}
                        >
                            <SelectTrigger className="w-[160px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="accepted">
                                    Accepted
                                </SelectItem>
                                <SelectItem value="rejected">
                                    Rejected
                                </SelectItem>
                                <SelectItem value="inactive">
                                    Inactive
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <ScrollArea type="always" className="w-full overflow-x-auto">
                    <DataTable
                        data={students ? students.data : []}
                        columns={StudentColumns}
                        isLoading={isLoading}
                        manualPagination
                        pageCount={students?.meta.last_page}
                        totalItems={students?.meta.total}
                        pagination={{
                            pageIndex: filters.page - 1,
                            pageSize: filters.per_page,
                        }}
                        onPageChange={(page) =>
                            setFilters((f) => ({ ...f, page }))
                        }
                        onPageSizeChange={(size) =>
                            setFilters((f) => ({ ...f, per_page: size }))
                        }
                        getRowId={(row) => row.user.id.toString()}
                        onSelectedRowsChange={(rows) =>
                            setSelectedStudentsIds(rows.map((r) => r.user.id))
                        }
                    />
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>

            <Dialog
                open={isStatusModalOpen}
                onOpenChange={setIsStatusModalOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Update Status for {selectedStudentsIds.length}{" "}
                            Student(s)
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 py-2">
                        <Select
                            value={newStatus}
                            onValueChange={handleNewStatusChange}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select new status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="accepted">
                                    Accepted
                                </SelectItem>
                                <SelectItem value="rejected">
                                    Rejected
                                </SelectItem>
                                <SelectItem value="inactive">
                                    Inactive
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsStatusModalOpen(false)}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleBulkUpdate}
                            disabled={!newStatus || isPending}
                        >
                            Update
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog
                open={isCompanyModalOpen}
                onOpenChange={setCompanyModalOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Assign Company to {selectedStudentsIds.length}{" "}
                            Student(s)
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 py-2">
                        <Select
                            onValueChange={(val) =>
                                setSelectedCompanyId(Number(val))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Company" />
                            </SelectTrigger>
                            <SelectContent>
                                {companies?.map((c) => (
                                    <SelectItem key={c.id} value={String(c.id)}>
                                        {c.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setCompanyModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleBulkUpdateCompany}
                            disabled={!selectedCompanyId}
                        >
                            Assign
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default StudentManagementPage
