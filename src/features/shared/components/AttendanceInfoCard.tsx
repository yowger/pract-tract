import { useState } from "react"
import { startOfWeek, format } from "date-fns"

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
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts"
import { useAttendanceCharts } from "../hooks/useCompany"

const COLORS = ["#4ade80", "#f87171", "#facc15", "#60a5fa"]

const today = new Date()
const thisWeekStart = startOfWeek(today, { weekStartsOn: 1 })

const AttendanceInfoCard = ({ companyId }: { companyId: number }) => {
    const [filters, setFilters] = useState<AttendanceFilters>({
        page: 1,
        per_page: 10,
        company_id: companyId,
        student_name: "",
        status: undefined,
        start_date: format(thisWeekStart, "yyyy-MM-dd"),
        end_date: format(today, "yyyy-MM-dd"),
    })

    const {
        data: attendances,
        isLoading: isLoadingAttendances,
        refetch,
    } = useAttendances(filters)
    const { data: charts } = useAttendanceCharts({
        company_id: companyId,
        start_date: filters.start_date,
        end_date: filters.end_date,
        student_name: filters.student_name,
    })

    const pieData = (charts?.pieData || []).map((d) => ({
        ...d,
        value: Number(d.value),
    }))

    const lineData = (charts?.lineData || []).map((d) => ({
        ...d,
        present: Number(d.present),
        absent: Number(d.absent),
        late: Number(d.late),
        excused: Number(d.excused),
    }))

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
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Attendance Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-sm font-medium mb-2">
                        Attendance Trend
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart
                            data={lineData}
                            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="present"
                                stroke="#4ade80"
                            />
                            <Line
                                type="monotone"
                                dataKey="absent"
                                stroke="#f87171"
                            />
                            <Line
                                type="monotone"
                                dataKey="late"
                                stroke="#facc15"
                            />
                            <Line
                                type="monotone"
                                dataKey="excused"
                                stroke="#60a5fa"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-sm font-medium mb-2">
                        Attendance Status Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={70}
                                fill="#8884d8"
                                label
                            >
                                {(charts?.pieData || []).map(
                                    (_entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    )
                                )}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="flex gap-3 flex-wrap mb-4 mt-4">
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
                isLoading={isLoadingAttendances}
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
