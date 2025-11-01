import AdvisorTabs from "@/features/shared/components/AdvisorTabs"
import { useParams } from "react-router-dom"

const DirectorAdvisorProfilePage = () => {
    const { id } = useParams()

    return <AdvisorTabs id={Number(id)} />
}

export default DirectorAdvisorProfilePage
