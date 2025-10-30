import { useParams } from "react-router-dom"

import StudentTabs from "@/features/shared/components/StudentTabs"

const DirectorStudentProfilePage = () => {
    const { id } = useParams()

    return <StudentTabs id={Number(id)} />
}

export default DirectorStudentProfilePage
