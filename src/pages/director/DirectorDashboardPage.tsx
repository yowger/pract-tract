import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useDirectorDashboard } from "@/features/director/hooks/useDirectorDashboard"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
    // PieChart,
    // Pie,
    // Cell,
    // Legend,
} from "recharts"
import { GraduationCap, Users, Building2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

// const COLORS = [
//     "#0ea5e9",
//     "#22c55e",
//     "#facc15",
//     "#f87171",
//     "#a78bfa",
//     "#ec4899",
// ]

export const DirectorDashboardPage = () => {
    const { data, isLoading, isError } = useDirectorDashboard()

    if (isLoading) {
        return (
            <div className="p-6 space-y-6">
                <Skeleton className="h-8 w-48" />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Skeleton className="h-28" />
                    <Skeleton className="h-28" />
                    <Skeleton className="h-28" />
                </div>
                <Skeleton className="h-96" />
            </div>
        )
    }

    if (isError || !data) {
        return (
            <div className="p-6 text-center text-red-500">
                Error loading dashboard
            </div>
        )
    }

    const { counts, charts } = data

    const studentsByProgramData =
        charts.students_by_program?.map((item) => ({
            name: item.code || item.name,
            fullName: item.name,
            value: item.count,
        })) ?? []

    // const internshipStatusData = Object.entries(charts.internship_status).map(
    //     ([name, value]) => ({ name, value })
    // )

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-semibold tracking-tight">
                Director Dashboard
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Students
                        </CardTitle>
                        <GraduationCap className="w-5 h-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">
                            {counts.students}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Total enrolled students
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Advisors
                        </CardTitle>
                        <Users className="w-5 h-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">
                            {counts.advisors}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Active faculty advisors
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Companies
                        </CardTitle>
                        <Building2 className="w-5 h-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">
                            {counts.companies}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Partner organizations
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Students by Program</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={studentsByProgramData}>
                                <XAxis
                                    dataKey="name"
                                    tick={{ fontSize: 12 }}
                                    interval={0}
                                    height={60}
                                />
                                <YAxis />
                                <Tooltip
                                    formatter={(
                                        value: number,
                                        _name,
                                        props
                                    ) => [
                                        value,
                                        props.payload.fullName ||
                                            props.payload.name,
                                    ]}
                                />
                                <Bar
                                    dataKey="value"
                                    fill="#0ea5e9"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* <Card>
                    <CardHeader>
                        <CardTitle>Internship Status</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={internshipStatusData}
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={100}
                                    label
                                >
                                    {internshipStatusData.map((_, index) => (
                                        <Cell
                                            key={index}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card> */}
            </div>
        </div>
    )
}

export default DirectorDashboardPage
