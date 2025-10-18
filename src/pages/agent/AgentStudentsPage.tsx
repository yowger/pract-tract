import { useState } from "react"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import DataTable from "@/features/shared/components/Datatable"
import { Input } from "@/components/ui/input"
import { useStudents } from "@/features/director/hooks/useStudents"
import type { StudentQueryParams } from "@/features/director/api/studentApi"
import { useUser } from "@/features/auth/hooks/useUser"
import { isAgent } from "@/features/auth/types/auth"
import { AgentStudentColumns } from "@/features/agent/components/AgentStudentColumns"

const AgentStudentsPage = () => {
    const { data: userRes } = useUser()

    const companyId =
        userRes && isAgent(userRes.user) ? userRes.user.agent.company_id : null

    const [filters, setFilters] = useState<StudentQueryParams>({
        page: 1,
        per_page: 10,
        student: "",
        status: "",
        company_id: companyId || undefined,
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
                </div>
            </div>

            <ScrollArea type="always" className="w-full overflow-x-auto">
                <DataTable
                    data={students ? students.data : []}
                    columns={AgentStudentColumns}
                    isLoading={isLoading}
                    manualPagination
                    pageCount={students?.meta.last_page}
                    totalItems={students?.meta.total}
                    pagination={{
                        pageIndex: filters.page ? filters.page - 1 : 0,
                        pageSize: filters.per_page || 10,
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

export default AgentStudentsPage
