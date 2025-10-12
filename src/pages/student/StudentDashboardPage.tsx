import { useUser } from "@/features/auth/hooks/useUser"

const StudentDashboardPage = () => {
    const { data: user } = useUser()
    console.log("🚀 ~ StudentDashboardPage ~ user:", user)

    return <div>StudentDashboard</div>
}

export default StudentDashboardPage
