import { useState } from "react"
import { startOfWeek, format, parseISO, isThisYear } from "date-fns"

import { Input } from "@/components/ui/input"
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
import { XAxis, CartesianGrid, BarChart, Bar } from "recharts"
import { useAttendanceCharts } from "../hooks/useCompany"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { ATTENDANCE_STATUS_COLOR_MAP } from "@/const/colors"
import { formatDateSmart } from "../../../utils/utils"

import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const today = new Date()
const thisWeekStart = startOfWeek(today, { weekStartsOn: 1 })

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "#2563eb",
    },
    mobile: {
        label: "Mobile",
        color: "#60a5fa",
    },
} satisfies ChartConfig

const AttendanceInfoCard = ({ companyId }: { companyId: number }) => {
    const [filters, setFilters] = useState<AttendanceFilters>({
        page: 1,
        per_page: 10,
        company_id: companyId,
        student_name: undefined,
        status: undefined,
        start_date: format(thisWeekStart, "yyyy-MM-dd"),
        end_date: format(today, "yyyy-MM-dd"),
    })

    const { data: attendances, isLoading: isLoadingAttendances } =
        useAttendances(filters)
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
        undertime: Number(d.undertime),
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

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <Card className="py-0">
                    <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
                        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
                            <CardTitle>Attendance Stats</CardTitle>
                            <CardDescription>
                                Attendance summary from{" "}
                                {formatDateSmart(filters.start_date ?? "")} to{" "}
                                {formatDateSmart(filters.end_date ?? "")}.
                            </CardDescription>
                        </div>
                        <div className="flex">
                            {pieData.map(({ name, value }) => {
                                const color =
                                    ATTENDANCE_STATUS_COLOR_MAP[
                                        name as keyof typeof ATTENDANCE_STATUS_COLOR_MAP
                                    ]

                                return (
                                    <button
                                        key={name}
                                        className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                                    >
                                        <div className="flex items-center gap-1">
                                            <span
                                                className="inline-block w-2.5 h-2.5 rounded-full"
                                                style={{
                                                    backgroundColor: color,
                                                }}
                                            ></span>
                                            <span className="text-muted-foreground text-xs capitalize">
                                                {name}
                                            </span>
                                        </div>
                                        <span className="text-lg leading-none font-bold sm:text-3xl">
                                            {value}
                                        </span>
                                    </button>
                                )
                            })}
                        </div>
                    </CardHeader>

                    <CardContent className="px-2 sm:p-6">
                        <ChartContainer
                            config={chartConfig}
                            className="min-h-[200px] w-full"
                        >
                            <BarChart accessibilityLayer data={lineData}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="date"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => {
                                        const date = parseISO(value)
                                        return isThisYear(date)
                                            ? format(date, "MMM d")
                                            : format(date, "MMM d, yyyy")
                                    }}
                                />
                                <ChartTooltip
                                    content={<ChartTooltipContent />}
                                />
                                <Bar
                                    dataKey="present"
                                    stackId="a"
                                    fill={ATTENDANCE_STATUS_COLOR_MAP.present}
                                    name="Present"
                                />
                                <Bar
                                    dataKey="absent"
                                    stackId="a"
                                    fill={ATTENDANCE_STATUS_COLOR_MAP.absent}
                                    name="Absent"
                                />
                                <Bar
                                    dataKey="late"
                                    stackId="a"
                                    fill={ATTENDANCE_STATUS_COLOR_MAP.late}
                                    name="Late"
                                />
                                <Bar
                                    dataKey="excused"
                                    stackId="a"
                                    fill={ATTENDANCE_STATUS_COLOR_MAP.excused}
                                    name="Excused"
                                />
                                <Bar
                                    dataKey="undertime"
                                    stackId="a"
                                    fill={ATTENDANCE_STATUS_COLOR_MAP.undertime}
                                    name="Undertime"
                                />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>

            <div className="bg-white p-5 rounded-lg shadow space-y-4">
                <div className="flex items-center flex-wrap gap-3">
                    <Input
                        placeholder="Search student by name"
                        value={filters.student_name}
                        onChange={handleSearchChange}
                        className="w-[220px]"
                    />

                    <div className="flex items-center gap-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="gap-2"
                                >
                                    <Filter className="w-4 h-4" />
                                </Button>
                            </PopoverTrigger>

                            <PopoverContent className="w-[320px] space-y-4">
                                <div className="space-y-2">
                                    <Label>Status</Label>
                                    <Select
                                        value={filters.status || "all"}
                                        onValueChange={handleStatusChange}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">
                                                All
                                            </SelectItem>
                                            <SelectItem value="present">
                                                Present
                                            </SelectItem>
                                            <SelectItem value="absent">
                                                Absent
                                            </SelectItem>
                                            <SelectItem value="late">
                                                Late
                                            </SelectItem>
                                            <SelectItem value="excused">
                                                Excused
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Date range</Label>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            type="date"
                                            value={filters.start_date}
                                            onChange={(e) =>
                                                handleDateChange(
                                                    "start_date",
                                                    e.target.value
                                                )
                                            }
                                            className="w-[140px]"
                                        />
                                        <span className="text-muted-foreground">
                                            to
                                        </span>
                                        <Input
                                            type="date"
                                            value={filters.end_date}
                                            onChange={(e) =>
                                                handleDateChange(
                                                    "end_date",
                                                    e.target.value
                                                )
                                            }
                                            className="w-[140px]"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Per Page</Label>
                                    <Select
                                        value={String(filters.per_page)}
                                        onValueChange={(val) =>
                                            setFilters((f) => ({
                                                ...f,
                                                per_page: parseInt(val),
                                                page: 1,
                                            }))
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Per page" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="10">
                                                10
                                            </SelectItem>
                                            <SelectItem value="20">
                                                20
                                            </SelectItem>
                                            <SelectItem value="50">
                                                50
                                            </SelectItem>
                                            <SelectItem value="100">
                                                100
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
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
                        setFilters((f) => ({
                            ...f,
                            per_page: newSize,
                            page: 1,
                        }))
                    }
                />
            </div>
        </div>
    )
}

export default AttendanceInfoCard
