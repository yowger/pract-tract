import { Navigate, Outlet } from "react-router-dom"

import type { UserRole } from "@/types/roles"
import { useUser } from "../../hooks/useUser"

interface ProtectedRouteProps {
    allowedRoles: UserRole[]
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
    const { data: user, isLoading } = useUser()

    if (isLoading) return <div>Loading...</div>

    if (!user) return <Navigate to="/signin" replace />

    if (!allowedRoles.includes(user.user.role)) {
        const redirectPath =
            user.user.role === "director"
                ? "/director/dashboard"
                : user.user.role === "student"
                ? "/student/dashboard"
                : "/landing"

        return <Navigate to={redirectPath} replace />
    }

    return (
        <div className="w-full min-h-screen">
            <Outlet />
        </div>
    )
}
