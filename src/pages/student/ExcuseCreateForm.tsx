import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const excuseFormSchema = z.object({
    student_id: z.number().optional(),
    reason: z.string().min(1, "Reason is required"),
    description: z.string().optional(),
    date: z.string().min(1, "Date is required"),
})

export type ExcuseFormValues = z.infer<typeof excuseFormSchema>

interface ExcuseFormProps {
    onSubmit: (values: ExcuseFormValues) => void
    disabled?: boolean
    hideStudentId?: boolean
}

export function ExcuseForm({
    onSubmit,
    disabled,
    hideStudentId = false,
}: ExcuseFormProps) {
    const form = useForm<ExcuseFormValues>({
        resolver: zodResolver(excuseFormSchema),
        defaultValues: {
            student_id: 0,
            reason: "",
            description: "",
            date: "",
        },
    })

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 max-w-xl mx-auto"
            >
                <div>
                    <h2 className="text-xl font-semibold mb-1">
                        Submit Excuse Form
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Provide details about your absence.
                    </p>
                </div>

                <Separator />

                <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {!hideStudentId && (
                        <FormField
                            control={form.control}
                            name="student_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Student ID</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter student ID"
                                            {...field}
                                            value={field.value || ""}
                                            onChange={(e) =>
                                                field.onChange(
                                                    Number(e.target.value)
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}

                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date of Absence</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </section>

                <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Reason</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="e.g. Medical, Family Emergency"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description (optional)</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Additional details if necessary"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Separator />

                <Button
                    type="submit"
                    className="w-full"
                    disabled={disabled || form.formState.isSubmitting}
                >
                    {form.formState.isSubmitting
                        ? "Submitting Excuse..."
                        : "Submit Excuse"}
                </Button>
            </form>
        </Form>
    )
}
