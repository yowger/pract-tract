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
import { useCompanies } from "@/features/director/hooks/useCompanies"
import { CompanyColumns } from "@/features/director/components/CompanyColumn"
import type { CompanyFilters } from "@/features/director/api/companiesApi"

export const CompanyManagementPage = () => {
    const [filters, setFilters] = useState<CompanyFilters>({
        page: 1,
        per_page: 10,
        search: "",
        is_active: undefined,
    })

    const { data, isLoading } = useCompanies(filters)

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">Companies</h1>

                <div className="flex gap-3 items-center">
                    <Input
                        placeholder="Search company..."
                        value={filters.search ?? ""}
                        onChange={(e) => {
                            setFilters((f) => ({
                                ...f,
                                search: e.target.value,
                                page: 1,
                            }))
                        }}
                        className="w-[200px]"
                    />
                    <Select
                        value={
                            filters.is_active === undefined
                                ? "all"
                                : filters.is_active
                                ? "active"
                                : "inactive"
                        }
                        onValueChange={(val) => {
                            setFilters((f) => ({
                                ...f,
                                is_active:
                                    val === "all"
                                        ? undefined
                                        : val === "active",
                                page: 1,
                            }))
                        }}
                    >
                        <SelectTrigger className="w-[160px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <ScrollArea type="always" className="w-full overflow-x-auto">
                <DataTable
                    data={data?.data ?? []}
                    columns={CompanyColumns}
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

export default CompanyManagementPage
