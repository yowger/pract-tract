import { useDirectorDashboard } from "@/features/director/hooks/useDirectorDashboard"

const DirectorDashboardPage = () => {
    const { data, isLoading, isError } = useDirectorDashboard()

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error loading dashboard</div>

    const { counts, charts } = data

    return (
        <div>
            <h1>Director Dashboard</h1>

            <div className="counts">
                <div>Students: {counts.students}</div>
                <div>Advisors: {counts.advisors}</div>
                <div>Companies: {counts.companies}</div>
            </div>

            <div className="charts">
                <h2>Students by Program</h2>
                <pre>{JSON.stringify(charts.students_by_program, null, 2)}</pre>

                <h2>Internship Status</h2>
                <pre>{JSON.stringify(charts.internship_status, null, 2)}</pre>
            </div>
        </div>
    )
}

export default DirectorDashboardPage
