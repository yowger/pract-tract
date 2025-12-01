import { useUser } from "@/features/auth/hooks/useUser"
import { isStudent } from "@/features/auth/types/auth"
import { useStudent } from "@/features/shared/hooks/useStudent"

export default function StudentDashboard() {
    const { data: user } = useUser()
    const studentId =
        user && isStudent(user?.user) ? user.user.student.id : null

    const { data: studentData, isLoading } = useStudent(Number(studentId))

    if (isLoading) return <div>Loading...</div>
    if (!studentData) return <div>No data available.</div>

    const s = studentData.data

    const remainingHours = Math.max(
        (s.required_hours ?? 0) - (s.hours_attended ?? 0),
        0
    )

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-semibold">Student Dashboard</h1>
                <p className="text-gray-600">{s.user.name}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard title="Start Date" value={s.ojt_start_date ?? "—"} />
                <StatCard
                    title="Projected End"
                    value={s.projected_end_date ?? "—"}
                />
                <StatCard title="End Date" value={s.ojt_end_date ?? "—"} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <StatCard title="Required Hours" value={s.required_hours} />
                <StatCard title="Hours Attended" value={s.hours_attended} />
                <StatCard
                    title="Effective Required"
                    value={s.effective_required_hours}
                />
                <StatCard title="Remaining Hours" value={remainingHours} />
                <StatCard title="Completion" value={s.completion + "%"} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard title="Auto Absences" value={s.auto_absences_count} />
                <StatCard
                    title="Total Absences"
                    value={s.total_absences_count}
                />
            </div>
        </div>
    )
}

function StatCard({ title, value }: { title: string; value: string | number }) {
    return (
        <div className="p-4 rounded-xl border shadow-sm bg-white">
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-semibold">{value}</p>
        </div>
    )
}
