import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useEvaluations } from "@/features/shared/api/evaluationsApi"
import { EvaluationsTable } from "@/features/shared/components/EvaluationsTable"

const DirectorEvaluationsPage = () => {
    const { data: evaluations } = useEvaluations()
    console.log("🚀 ~ DirectorEvaluationsPage ~ evaluations:", evaluations)

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Evaluations</h1>
                <Link to="create">
                    <Button>Create Evaluation</Button>
                </Link>
            </div>

            {evaluations && evaluations.length > 0 ? (
                <EvaluationsTable data={evaluations} />
            ) : (
                <p className="text-gray-500 mt-4">No evaluations found.</p>
            )}
        </div>
    )
}

export default DirectorEvaluationsPage
