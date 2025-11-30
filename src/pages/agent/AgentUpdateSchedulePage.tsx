import { useNavigate, Navigate, useParams } from "react-router-dom"
import { ScheduleForm } from "@/features/agent/components/ScheduleForm"
import { useUser } from "@/features/auth/hooks/useUser"
import { isAgent } from "@/features/auth/types/auth"
import {
    useSchedule,
    useUpdateSchedule,
} from "@/features/agent/hooks/useSchedule"
import type { ScheduleFormValues } from "@/features/agent/api/schedule"
import { toast } from "sonner"
import { cleanUndefined } from "@/utils/utils"

const AgentUpdateSchedulePage = () => {
    const { id } = useParams()
    const scheduleId = Number(id)
    const { data: schedule, isLoading: isScheduleLoading } =
        useSchedule(scheduleId)
    console.log("🚀 ~ AgentUpdateSchedulePage ~ schedule:", schedule)
    const { data, isLoading: isUserLoading } = useUser()
    const { mutate: updateSchedule, isPending } = useUpdateSchedule()
    const navigate = useNavigate()

    if (isUserLoading || isScheduleLoading) return <div>Loading...</div>

    if (!data || !isAgent(data.user)) {
        return <Navigate to="/signin" replace />
    }

    // const companyId = data?.user?.agent?.company_id

    const formattedInitialValue = schedule
        ? {
              day_of_week: Array.isArray(schedule.day_of_week)
                  ? schedule.day_of_week
                  : JSON.parse(schedule.day_of_week),
            //   start_date: schedule.start_date,
            //   end_date: schedule.end_date,
              am_time_in: schedule.am_time_in?.slice(0, 5) || "",
              am_time_out: schedule.am_time_out?.slice(0, 5) || "",
              am_require_photo_in: Boolean(schedule.am_require_photo_in),
              am_require_photo_out: Boolean(schedule.am_require_photo_out),
              am_require_location_in: Boolean(schedule.am_require_location_in),
              am_require_location_out: Boolean(
                  schedule.am_require_location_out
              ),
              am_grace_period_minutes: schedule.am_grace_period_minutes ?? 0,
              am_undertime_grace_minutes:
                  schedule.am_undertime_grace_minutes ?? 0,
              pm_time_in: schedule.pm_time_in?.slice(0, 5) || "",
              pm_time_out: schedule.pm_time_out?.slice(0, 5) || "",
              pm_require_photo_in: Boolean(schedule.pm_require_photo_in),
              pm_require_photo_out: Boolean(schedule.pm_require_photo_out),
              pm_require_location_in: Boolean(schedule.pm_require_location_in),
              pm_require_location_out: Boolean(
                  schedule.pm_require_location_out
              ),
              pm_grace_period_minutes: schedule.pm_grace_period_minutes ?? 0,
              pm_undertime_grace_minutes:
                  schedule.pm_undertime_grace_minutes ?? 0,
              allow_early_in: Boolean(schedule.allow_early_in),
              early_in_limit_minutes: schedule.early_in_limit_minutes ?? 0,
              location:
                  schedule.lat && schedule.lng
                      ? `${schedule.lat},${schedule.lng}`
                      : "",
              radius: schedule.radius ?? 30,
          }
        : undefined

    const handleSubmit = (formData: ScheduleFormValues) => {
        if (!scheduleId) return

        const cleanedData = {
            ...cleanUndefined(formData),
            lat: Number(formData.location.split(",")[0]),
            lng: Number(formData.location.split(",")[1]),
        }

        updateSchedule(
            { id: scheduleId, data: cleanedData },
            {
                onSuccess: () => {
                    toast.success("Schedule updated successfully")
                    navigate("/agent/dashboard")
                },
                onError: (error) => {
                    console.log("🚀 ~ handleSubmit ~ error:", error)
                    toast.error("Failed to update schedule")
                },
            }
        )
    }

    return (
        <div>
            <div className="max-w-2xl bg-white p-6 rounded-xl">
                <h1 className="text-3xl font-bold mb-4">Update Schedule</h1>

                <ScheduleForm
                    onSubmit={handleSubmit}
                    disabled={isPending}
                    initialValues={formattedInitialValue}
                />
            </div>
        </div>
    )
}

export default AgentUpdateSchedulePage
