import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"
import DataTable from "@/features/shared/components/Datatable"
import { useAttendances } from "@/features/shared/hooks/useAttendance"
import { AgentAttendanceColumns } from "@/features/agent/components/AgentAttendanceColumn"
import type {
    AttendanceFilters,
    AttendanceStatus,
} from "@/features/shared/api/attendanceApi"

const AttendanceInfoCard = ({ companyId }: { companyId: number }) => {
    const [filters, setFilters] = useState<AttendanceFilters>({
        page: 1,
        per_page: 10,
        company_id: companyId,
        student_name: "",
        status: undefined,
        start_date: "",
        end_date: "",
    })

    const { data: attendances, isLoading, refetch } = useAttendances(filters)

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters((f) => ({ ...f, student_name: e.target.value, page: 1 }))
    }

    const handleStatusChange = (value: string) => {
        setFilters((f) => ({
            ...f,
            status: value === "all" ? undefined : (value as AttendanceStatus),
            page: 1,
        }))
    }

    const handleDateChange = (
        field: "start_date" | "end_date",
        value: string
    ) => {
        setFilters((f) => ({ ...f, [field]: value, page: 1 }))
    }

    const handleApplyFilters = () => {
        setFilters((f) => ({ ...f, page: 1 }))
        refetch()
    }

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Attendance</h2>

            <div className="flex gap-3 flex-wrap mb-4">
                <Input
                    placeholder="Student name"
                    value={filters.student_name}
                    onChange={handleSearchChange}
                    className="w-[200px]"
                />

                <Input
                    type="date"
                    placeholder="From"
                    value={filters.start_date}
                    onChange={(e) =>
                        handleDateChange("start_date", e.target.value)
                    }
                />

                <Input
                    type="date"
                    placeholder="To"
                    value={filters.end_date}
                    onChange={(e) =>
                        handleDateChange("end_date", e.target.value)
                    }
                />

                <Select
                    value={filters.status || "all"}
                    onValueChange={handleStatusChange}
                >
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="present">Present</SelectItem>
                        <SelectItem value="absent">Absent</SelectItem>
                        <SelectItem value="late">Late</SelectItem>
                        <SelectItem value="excused">Excused</SelectItem>
                    </SelectContent>
                </Select>

                <Button onClick={handleApplyFilters}>Apply</Button>
            </div>

            <DataTable
                data={attendances?.data || []}
                columns={AgentAttendanceColumns}
                isLoading={isLoading}
                manualPagination
                pageCount={attendances?.meta?.last_page}
                totalItems={attendances?.meta?.total}
                pagination={{
                    pageIndex: filters.page - 1,
                    pageSize: filters.per_page,
                }}
                onPageChange={(newPageIndex) =>
                    setFilters((f) => ({ ...f, page: newPageIndex }))
                }
                onPageSizeChange={(newSize) =>
                    setFilters((f) => ({ ...f, per_page: newSize, page: 1 }))
                }
            />
        </div>
    )
}

export default AttendanceInfoCard
