import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useCompany } from "../hooks/useCompany"
import type { Student } from "@/types/studentList"
import type { Question, User } from "../api/evaluationsApi"
import { EvaluationSheet } from "./EvaluationForm"

export default function StudentEvaluationModal({
    student,
    companyId,
    onClose,
}: {
    student: Student
    companyId: number
    onClose: () => void
}) {
    const [selectedEval, setSelectedEval] = useState<{
        id: number
        name: string
        description?: string | null
        questions: Question[]
        users?: User[]
        created_at: string
        updated_at: string
    } | null>(null)

    const [sheetOpen, setSheetOpen] = useState(false)

    const { data: company } = useCompany(companyId)
    const evaluations = company?.owner_evaluations || []

    const openEvaluation = (ev: (typeof evaluations)[number]) => {
        setSelectedEval(ev)
        setSheetOpen(true)
    }

    const closeEvaluation = () => {
        setSheetOpen(false)
        setSelectedEval(null)
    }

    return (
        <>
            <Dialog open onOpenChange={onClose}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Evaluate {student.user.name}</DialogTitle>
                    </DialogHeader>

                    {!selectedEval && (
                        <div className="space-y-2">
                            {evaluations.map((ev) => (
                                <div
                                    key={ev.id}
                                    onClick={() => openEvaluation(ev)}
                                    className="p-4 border rounded cursor-pointer hover:bg-gray-100"
                                >
                                    <p className="font-semibold">{ev.name}</p>
                                    <p className="text-sm text-gray-500">
                                        {ev.questions.length} questions
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {selectedEval && (
                <EvaluationSheet
                    open={sheetOpen}
                    onOpenChange={(open) => {
                        if (!open) closeEvaluation()
                        else setSheetOpen(true)
                    }}
                    evaluation={selectedEval}
                    studentId={student.id}
                    onSubmitSuccess={() => {
                        closeEvaluation()
                        onClose()
                    }}
                />
            )}
        </>
    )
}
