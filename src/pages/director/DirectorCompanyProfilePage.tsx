import { useParams } from "react-router-dom"

import CompanyTabs from "@/features/shared/components/CompanyTabs"

const DirectorCompanyProfilePage = () => {
    const { id } = useParams()

    return <CompanyTabs id={Number(id)} />
}

export default DirectorCompanyProfilePage
