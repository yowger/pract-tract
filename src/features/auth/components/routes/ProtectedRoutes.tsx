import { Navigate } from "react-router-dom"

import { useUser } from "../../hooks/useUser"
import type { UserRole } from "@/types/roles"

interface ProtectedRouteProps {
    children: React.ReactNode
    redirectTo?: string
    allowedRoles?: UserRole[]
}

export const ProtectedRoute = ({
    children,
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

    return <>{children}</>
}
