import { useNavigate, Navigate } from "react-router-dom"
import { ScheduleForm } from "@/features/agent/components/ScheduleForm"
import { useUser } from "@/features/auth/hooks/useUser"
import { isAgent } from "@/features/auth/types/auth"
import { useCreateSchedule } from "@/features/agent/hooks/useSchedule"
import type { ScheduleFormValues } from "@/features/agent/api/schedule"
import { toast } from "sonner"
import { cleanUndefined } from "@/utils/utils"

const AgentCreateSchedulePage = () => {
    const { data, isLoading } = useUser()
    const { mutate: createSchedule, isPending } = useCreateSchedule()
    const navigate = useNavigate()

    if (isLoading) return <div>Loading...</div>

    if (!data || !isAgent(data.user)) {
        return <Navigate to="/signin" replace />
    }

    const companyId = data?.user?.agent?.company_id

    const handleSubmit = (formData: ScheduleFormValues) => {
        console.log("🚀 ~ handleSubmit ~ formData:", formData)
        const cleanedData = {
            ...cleanUndefined(formData),
            company_id: companyId,
        }

        createSchedule(cleanedData, {
            onSuccess: () => {
                toast.success("Schedule created successfully")
                navigate("/agent/profile")
            },
            onError: () => {
                toast.error("Failed to create schedule")
            },
        })
    }

    return (
        <div>
            <div className="max-w-2xl bg-white p-6 rounded-xl">
                <ScheduleForm onSubmit={handleSubmit} disabled={isPending} />
            </div>
        </div>
    )
}

export default AgentCreateSchedulePage
