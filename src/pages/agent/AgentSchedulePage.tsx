import { Navigate } from "react-router-dom"

import { ScheduleForm } from "@/features/agent/components/ScheduleForm"
import { useUser } from "@/features/auth/hooks/useUser"
import { isAgent } from "@/features/auth/types/auth"

const AgentSchedulePage = () => {
    const { data, isLoading } = useUser()

    if (isLoading) return <div>Loading...</div>

    if (!data || !isAgent(data.user)) {
        return <Navigate to="/signin" replace />
    }

    return (
        <div>
            <div className="max-w-2xl">
                <ScheduleForm
                    onSubmit={(data) => {
                        console.log("🚀 ~ AgentSchedulePage ~ data:", data)
                    }}
                />
            </div>
        </div>
    )
}

export default AgentSchedulePage
