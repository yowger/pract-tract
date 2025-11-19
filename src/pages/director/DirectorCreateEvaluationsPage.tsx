import { useForm, useFieldArray, Controller } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type QuestionType = "multiple" | "text"

interface Question {
    name: string
    description: string
    type: QuestionType
    title: string
    options?: string[]
}

interface FormValues {
    name: string
    description: string
    questions: Question[]
}

const DirectorCreateEvaluationsPage = () => {
    const {
        control,
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            name: "",
            description: "",
            questions: [],
        },
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: "questions",
    })

    const questions = watch("questions")

    const onSubmit = (data: FormValues) => {
        console.log("🚀 ~ onSubmit ~ data:", data)
        // alert("Saved: " + JSON.stringify(data, null, 2))
    }

    return (
        <div className="grid grid-cols-2 gap-6 p-6 max-w-6xl mx-auto">
            <div className="space-y-4">
                <h1 className="text-2xl font-bold">Create Evaluation</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Input
                            {...register("name", {
                                required: "Name is required",
                            })}
                            placeholder="Questionnaire Name"
                            className="w-full"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">
                                {errors.name.message}
                            </p>
                        )}

                        <Textarea
                            {...register("description")}
                            placeholder="Description (optional)"
                            className="w-full"
                        />
                    </div>

                    {fields.map((field, index) => {
                        const type = watch(`questions.${index}.type`)
                        return (
                            <div
                                key={field.id}
                                className="border p-4 rounded shadow-sm space-y-2"
                            >
                                <div className="flex gap-2 items-center">
                                    <Input
                                        {...register(
                                            `questions.${index}.title` as const
                                        )}
                                        placeholder="Question title"
                                        className="flex-1"
                                    />

                                    <select
                                        {...register(
                                            `questions.${index}.type` as const
                                        )}
                                        className="border rounded px-2 py-1"
                                    >
                                        <option value="multiple">
                                            Multiple Choice
                                        </option>
                                        <option value="text">Text</option>
                                    </select>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => remove(index)}
                                    >
                                        Remove
                                    </Button>
                                </div>

                                {type === "multiple" && (
                                    <Controller
                                        control={control}
                                        name={`questions.${index}.options`}
                                        render={({ field }) => (
                                            <div className="space-y-2">
                                                {(field.value || [""]).map(
                                                    (opt, i) => (
                                                        <div
                                                            key={i}
                                                            className="flex gap-2"
                                                        >
                                                            <Input
                                                                value={opt}
                                                                placeholder={`Option ${
                                                                    i + 1
                                                                }`}
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    const updated =
                                                                        [
                                                                            ...(field.value ||
                                                                                []),
                                                                        ]
                                                                    updated[i] =
                                                                        e.target.value
                                                                    field.onChange(
                                                                        updated
                                                                    )
                                                                }}
                                                            />

                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                onClick={() => {
                                                                    const updated =
                                                                        [
                                                                            ...(field.value ||
                                                                                []),
                                                                        ]
                                                                    updated.splice(
                                                                        i,
                                                                        1
                                                                    )
                                                                    field.onChange(
                                                                        updated
                                                                    )
                                                                }}
                                                            >
                                                                X
                                                            </Button>
                                                        </div>
                                                    )
                                                )}

                                                <Button
                                                    type="button"
                                                    onClick={() =>
                                                        field.onChange([
                                                            ...(field.value ||
                                                                []),
                                                            "",
                                                        ])
                                                    }
                                                >
                                                    Add Option
                                                </Button>
                                            </div>
                                        )}
                                    />
                                )}
                            </div>
                        )
                    })}

                    <Button
                        type="button"
                        onClick={() =>
                            append({
                                name: "",
                                description: "",
                                type: "multiple",
                                title: "",
                                options: [""],
                            })
                        }
                    >
                        Add Question
                    </Button>

                    <Button type="submit">Save Evaluation</Button>
                </form>
            </div>

            <div className="space-y-4">
                <h1 className="text-2xl font-bold">Live Preview</h1>

                {questions.length === 0 && (
                    <p className="text-gray-500">
                        Add a question to see the preview.
                    </p>
                )}

                {questions.map((q, index) => (
                    <div
                        key={index}
                        className="border p-4 rounded bg-white shadow-sm space-y-2"
                    >
                        <p className="font-medium">
                            {q.title || "Untitled question"}
                        </p>

                        {q.type === "text" ? (
                            <Textarea disabled placeholder="Text answer…" />
                        ) : (
                            <RadioGroup>
                                {(q.options || []).map((opt, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-2"
                                    >
                                        <RadioGroupItem
                                            disabled
                                            value={opt}
                                            id={`prev-${index}-${i}`}
                                        />
                                        <label
                                            htmlFor={`prev-${index}-${i}`}
                                            className="text-sm"
                                        >
                                            {opt || "Option"}
                                        </label>
                                    </div>
                                ))}
                            </RadioGroup>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DirectorCreateEvaluationsPage
