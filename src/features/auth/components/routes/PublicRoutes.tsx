import { Navigate, Outlet } from "react-router-dom"
import { useUser } from "../../hooks/useUser"
import type { UserRole } from "@/types/roles"

export const PublicRoute = () => {
    const { data: user, isLoading } = useUser()

    if (isLoading) return <div>Loading...</div>

    if (user) {
        const roleRedirects: Record<UserRole, string> = {
            admin: "/admin/dashboard",
            director: "/director/dashboard",
            advisor: "/advisor/dashboard",
            agent: "/agent/dashboard",
            student: "/student/dashboard",
        }

        const redirectTo = roleRedirects[user.user.role] || "/landing"

        return <Navigate to={redirectTo} replace />
    }

    return <Outlet />
}
