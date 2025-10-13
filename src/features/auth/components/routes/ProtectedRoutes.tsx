import { Navigate, Outlet } from "react-router-dom"

import { useUser } from "../../hooks/useUser"
import type { UserRole } from "@/types/roles"

interface ProtectedRouteProps {
    redirectTo?: string
    allowedRoles?: UserRole[]
}

export const ProtectedRoute = ({
    allowedRoles,
    redirectTo = "/signin",
}: ProtectedRouteProps) => {
    const { data: profile, isLoading } = useUser()

    if (isLoading) return <div>Loading...</div>

    if (
        !profile ||
        (allowedRoles && !allowedRoles.includes(profile.user.user.role))
    ) {
        return <Navigate to={redirectTo} replace />
    }

    return <Outlet />
}
