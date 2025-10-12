import { type ReactNode } from "react"
import { Navigate } from "react-router-dom"

import { useUser } from "../../hooks/useUser"

interface ProtectedRouteProps {
    children: ReactNode
    redirectTo?: string
}

export const ProtectedRoute = ({
    children,
    redirectTo = "/login",
}: ProtectedRouteProps) => {
    const { data: user, isLoading } = useUser()

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!user) {
        return <Navigate to={redirectTo} replace />
    }

    return <>{children}</>
}
