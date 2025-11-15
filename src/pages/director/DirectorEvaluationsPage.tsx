import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

const DirectorEvaluationsPage = () => {
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
