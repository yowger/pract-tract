import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import type { Evaluation } from "../api/evaluationsApi"
import { useSubmitEvaluation } from "../api/evlationsAnswersApi"

export function EvaluationSheet({
    open,
    onOpenChange,
    evaluation,
    studentId,
    onSubmitSuccess,
}: {
    open: boolean
    onOpenChange: (open: boolean) => void
    evaluation: Evaluation
    studentId: number
    onSubmitSuccess: () => void
}) {
    const [answers, setAnswers] = useState(
        evaluation.questions.map((q) => ({
            question: q.title,
            type: q.type,
            answer: "",
        }))
    )
    const [errors, setErrors] = useState<number[]>([])
    const [showSuccess, setShowSuccess] = useState(false)

    const { mutateAsync: submitEvaluation, isPending: isSubmitting } =
        useSubmitEvaluation()

    const handleChange = (index: number, value: string) => {
        setAnswers((prev) =>
            prev.map((a, i) => (i === index ? { ...a, answer: value } : a))
        )
        setErrors((prev) => prev.filter((e) => e !== index))
    }

    const validateForm = () => {
        const newErrors: number[] = []
        answers.forEach((a, idx) => {
            if (!a.answer.trim()) newErrors.push(idx)
        })
        setErrors(newErrors)
        return newErrors.length === 0
    }

    const submitEval = async () => {
        if (!validateForm()) return

        try {
            await submitEvaluation({
                evaluation_id: evaluation.id,
                student_id: studentId,
                answers,
            })
            setShowSuccess(true)
            setTimeout(() => {
                onSubmitSuccess()
                onOpenChange(false)
            }, 1500)
        } catch (err) {
            console.error(err)
        }
    }

    const progress =
        (answers.filter((a) => a.answer.trim()).length / answers.length) * 100

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                side="right"
                className="w-full sm:max-w-xl overflow-y-auto"
            >
                <SheetHeader>
                    <SheetTitle>{evaluation.name}</SheetTitle>
                    {evaluation.description && (
                        <SheetDescription>
                            {evaluation.description}
                        </SheetDescription>
                    )}
                </SheetHeader>

                {showSuccess ? (
                    <div className="flex flex-col items-center justify-center py-12 space-y-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-10 h-10 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">
                            Evaluation Submitted!
                        </h3>
                        <p className="text-gray-600">
                            Thank you for completing the assessment.
                        </p>
                    </div>
                ) : (
                    <div className="px-4">
                        <div className="mt-6">
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>Progress</span>
                                <span>{Math.round(progress)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>

                        <div className="space-y-6 mt-8">
                            {evaluation.questions.map((q, i) => (
                                <div key={i} className="space-y-2 py-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <label className="block font-semibold text-gray-900 text-lg">
                                            {i + 1}. {q.title}
                                        </label>
                                        {answers[i].answer.trim() && (
                                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                                        )}
                                    </div>

                                    {q.type === "text" ? (
                                        <textarea
                                            className={`w-full border-2 rounded-lg p-3 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                                                errors.includes(i)
                                                    ? "border-red-300 bg-white"
                                                    : "border-gray-300"
                                            }`}
                                            placeholder="Type your response here..."
                                            value={answers[i].answer}
                                            onChange={(e) =>
                                                handleChange(i, e.target.value)
                                            }
                                        />
                                    ) : (
                                        <div className="space-y-2">
                                            {q.options?.map((opt, idx) => (
                                                <label
                                                    key={idx}
                                                    className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                                                        answers[i].answer ===
                                                        opt
                                                            ? "border-blue-500 bg-blue-50"
                                                            : "border-gray-300 hover:border-gray-400 bg-white"
                                                    }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name={`q-${i}`}
                                                        value={opt}
                                                        checked={
                                                            answers[i]
                                                                .answer === opt
                                                        }
                                                        onChange={(e) =>
                                                            handleChange(
                                                                i,
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                                                    />
                                                    <span className="ml-3 text-gray-900">
                                                        {opt}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    )}

                                    {errors.includes(i) && (
                                        <div className="flex items-center mt-2 text-red-600 text-sm">
                                            <AlertCircle className="w-4 h-4 mr-1" />
                                            <span>This field is required</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {errors.length > 0 && (
                            <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                                <div className="flex items-center text-red-800">
                                    <AlertCircle className="w-5 h-5 mr-2" />
                                    <span className="font-semibold">
                                        Please complete all required fields (
                                        {errors.length} remaining)
                                    </span>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-between items-center my-4">
                            <Button
                                variant="ghost"
                                onClick={() => onOpenChange(false)}
                                disabled={isSubmitting}
                                className="text-gray-600 hover:text-gray-900"
                            >
                                Cancel
                            </Button>

                            <Button
                                onClick={submitEval}
                                disabled={isSubmitting}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
                            >
                                {isSubmitting
                                    ? "Submitting..."
                                    : "Submit Evaluation"}
                            </Button>
                        </div>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}
