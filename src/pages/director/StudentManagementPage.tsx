import { useState } from "react"

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
import { useStudents } from "@/features/director/hooks/useStudents"

const StudentManagementPage = () => {
    const [filters, setFilters] = useState({
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

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">Students</h1>

                <div className="flex gap-3 items-center">
                    <Input
                        placeholder="Search student..."
                        value={filters.student}
                        onChange={handleSearch}
                        className="w-[200px]"
                    />

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
                            <SelectItem value="accepted">Accepted</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
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
                    onPageChange={(page) => setFilters((f) => ({ ...f, page }))}
                    onPageSizeChange={(size) =>
                        setFilters((f) => ({ ...f, per_page: size }))
                    }
                />
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}

export default StudentManagementPage
