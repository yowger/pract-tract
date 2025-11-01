import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import DataTable from "@/features/shared/components/Datatable"
import { useState } from "react"
import type { AdvisorFilters } from "@/features/director/api/advisorsApi"
import { useAdvisors } from "@/features/director/hooks/useAdvisors"
import { AdvisorColumns } from "@/features/shared/components/CompanyAdvisorsColumn"

const AdvisorManagementPage = () => {
    const [filters, setFilters] = useState<AdvisorFilters>({
        page: 1,
        per_page: 10,
        name: "",
        email: "",
    })

    const { data, isLoading } = useAdvisors(filters)

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">Advisors</h1>
            </div>

            <ScrollArea type="always" className="w-full overflow-x-auto">
                <DataTable
                    data={data?.data ?? []}
                    columns={AdvisorColumns}
                    isLoading={isLoading}
                    manualPagination
                    pageCount={data?.meta?.last_page ?? 1}
                    totalItems={data?.meta?.total ?? 0}
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

export default AdvisorManagementPage
