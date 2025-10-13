import { Navigate } from "react-router-dom"

import type { UserRole } from "@/types/roles"
import { useUser } from "../../hooks/useUser"

interface ProtectedRouteProps {
    children: React.ReactNode
    allowedRoles: UserRole[]
    redirectTo?: string
}

export const ProtectedRoute = ({
    children,
    allowedRoles,
    redirectTo = "/signin",
}: ProtectedRouteProps) => {
    const { data: user, isLoading } = useUser()

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Loading...</p>
            </div>
        )
    }

    if (!user) {
        return <Navigate to={redirectTo} replace />
    }

    const roleRedirects: Record<UserRole, string> = {
        admin: "/admin/dashboard",
        director: "/director/dashboard",
        advisor: "/advisor/dashboard",
        agent: "/agent/dashboard",
        student: "/student/dashboard",
    }

    if (!allowedRoles.includes(user.user.role)) {
        return (
            <Navigate
                to={roleRedirects[user.user.role] ?? "/landing"}
                replace
            />
        )
    }

    return <>{children}</>
}
