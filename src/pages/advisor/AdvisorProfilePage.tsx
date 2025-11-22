import { useUser } from "@/features/auth/hooks/useUser"
import { isAdvisor } from "@/features/auth/types/auth"
import AdvisorTabs from "@/features/shared/components/AdvisorTabs"

const AdvisorProfilePage = () => {
    const { data: user } = useUser()
    console.log("🚀 ~ AdvisorProfilePage ~ user:", user)

    const advisorId = user && isAdvisor(user.user) ? user.user.advisor.id : null

    return <AdvisorTabs id={Number(advisorId)} />
}

export default AdvisorProfilePage
