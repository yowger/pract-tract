import { Link } from "react-router-dom"
import { useUser } from "@/features/auth/hooks/useUser"
import { isAgent } from "@/features/auth/types/auth"

import { ScheduleCard } from "@/features/director/components/ScheduleCard"

const AgentSchedulePage = () => {
    const { data: user, isLoading: userLoading } = useUser()

    const schedule =
        user?.user && isAgent(user.user)
            ? user.user.agent?.company?.schedule
            : null

    if (userLoading) return <div>Loading...</div>

    if (!schedule) {
        return <Link to="/agent/schedule/create">Create Schedule</Link>
    }

    return <ScheduleCard schedule={schedule} />
}

export default AgentSchedulePage
