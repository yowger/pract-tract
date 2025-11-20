import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useEvaluations } from "@/features/shared/api/evaluationsApi"

const DirectorEvaluationsPage = () => {
    const { data } = useEvaluations()
    console.log("🚀 ~ DirectorEvaluationsPage ~ data:", data)

    return (
        <div>
            <h1>Evaluations</h1>

            <Link to="create">
                <Button>Create Evaluation</Button>
            </Link>
        </div>
    )
}

export default DirectorEvaluationsPage
