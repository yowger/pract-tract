import { Navigate } from "react-router-dom"

import { ScheduleForm } from "@/features/agent/components/ScheduleForm"
import { useUser } from "@/features/auth/hooks/useUser"
import { isAgent } from "@/features/auth/types/auth"
import { useCreateSchedule } from "@/features/agent/hooks/useSchedule"
import type { ScheduleFormValues } from "@/features/agent/api/schedule"
import { toast } from "sonner"

const AgentSchedulePage = () => {
    const { data, isLoading } = useUser()
    const { mutate: createSchedule, isPending } = useCreateSchedule()

    if (isLoading) return <div>Loading...</div>

    if (!data || !isAgent(data.user)) {
        return <Navigate to="/signin" replace />
    }

    const handleSubmit = (formData: ScheduleFormValues) => {
        createSchedule(formData, {
            onSuccess: () => {
                toast.success("Schedule created successfully")
            },
            onError: () => {
                toast.error("Failed to create schedule")
            },
        })
    }

    return (
        <div>
            <div className="max-w-2xl">
                <ScheduleForm onSubmit={handleSubmit} disabled={isPending} />
            </div>
        </div>
    )
}

export default AgentSchedulePage
