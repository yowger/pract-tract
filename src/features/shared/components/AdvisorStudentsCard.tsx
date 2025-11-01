import { useState } from "react"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import DataTable from "./Datatable"
import { useStudents } from "@/features/director/hooks/useStudents"
import type { StudentQueryParams } from "@/features/director/api/studentApi"
import { CompanyStudentColumns } from "./CompanyStudentsColumn"

const AdvisorStudentsCard = ({ advisorId }: { advisorId: number }) => {
    const [filters, setFilters] = useState<StudentQueryParams>({
        page: 1,
        per_page: 10,
        advisor_id: advisorId,
    })

    const { data: students, isLoading } = useStudents(filters)

    return (
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
            <ScrollArea type="always" className="w-full overflow-x-auto">
                <DataTable
                    data={students ? students.data : []}
                    columns={CompanyStudentColumns}
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

export default AdvisorStudentsCard
