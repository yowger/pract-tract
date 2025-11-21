import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import type { EvaluationAnswer } from "../api/studentApi"

interface StudentEvaluationsTabProps {
    evaluationAnswers: EvaluationAnswer[]
}

export default function StudentEvaluationsTab({
    evaluationAnswers,
}: StudentEvaluationsTabProps) {
    const [selectedEval, setSelectedEval] = useState<EvaluationAnswer | null>(
        null
    )
    const [sheetOpen, setSheetOpen] = useState(false)

    const handleOpen = (evalAnswer: EvaluationAnswer) => {
        setSelectedEval(evalAnswer)
        setSheetOpen(true)
    }

    if (!evaluationAnswers || evaluationAnswers.length === 0) {
        return (
            <Card>
                <CardContent>
                    <p>No evaluations have been submitted yet.</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <>
            <div className="overflow-x-auto">
                <table className="w-full table-auto border border-gray-200 rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">Evaluation</th>
                            <th className="p-3 text-left">Submitted At</th>
                            <th className="p-3 text-left">
                                Questions Answered
                            </th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {evaluationAnswers.map((evalAnswer) => (
                            <tr
                                key={evalAnswer.id}
                                className="border-t border-gray-200 hover:bg-gray-50"
                            >
                                <td className="p-3">
                                    {evalAnswer.evaluation.name}
                                </td>
                                <td className="p-3">
                                    {new Date(
                                        evalAnswer.created_at
                                    ).toLocaleString()}
                                </td>
                                <td className="p-3">
                                    {evalAnswer.answers.length}
                                </td>
                                <td className="p-3">
                                    <Button
                                        size="sm"
                                        onClick={() => handleOpen(evalAnswer)}
                                    >
                                        View
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetContent side="right" className="w-full sm:max-w-lg">
                    <SheetHeader>
                        <SheetTitle>{selectedEval?.evaluation.name}</SheetTitle>
                    </SheetHeader>

                    <div className="space-y-4 mt-4">
                        {selectedEval?.answers.map((a, i) => (
                            <div key={i} className="p-3 border rounded">
                                <p className="font-semibold">{a.question}</p>
                                <p>{a.answer}</p>
                            </div>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}
