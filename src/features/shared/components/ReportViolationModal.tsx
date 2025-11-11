import { z } from "zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

const violationTypes = [
    { value: "attendance", label: "Attendance" },
    { value: "academic", label: "Academic" },
    { value: "behavior", label: "Behavior" },
    { value: "dress_code", label: "Dress code" },
    { value: "lateness", label: "Late" },
    { value: "unauthorized_absence", label: "Unauthorized absence" },
    { value: "professionalism", label: "Professionalism" },
    { value: "safety", label: "Safety violation" },
    { value: "misconduct", label: "Misconduct" },
    { value: "other", label: "Other" },
]

// const violationTypeMap = Object.fromEntries(
//     violationTypes.map((t) => [t.value, t.label])
// )

const violationSchema = z.object({
    studentId: z.string().optional(),
    name: z.string().min(1, "Name is required"),
    violationType: z.string().min(1, "Violation type is required"),
    remarks: z.string().min(1, "Remarks is required"),
    date: z.string().min(1, "Date is required"),
    attachments: z
        .array(
            z
                .instanceof(File)
                .refine((file) => file.type.startsWith("image/"), {
                    message: "Only image files are allowed",
                })
        )
        .optional(),
})

export type ViolationFormValues = z.infer<typeof violationSchema>

interface ReportViolationModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSubmit: (values: ViolationFormValues) => Promise<void> | void
    studentId?: number
    studentName?: string
}

export function ReportViolationModal({
    open,
    onOpenChange,
    onSubmit,
    studentId,
    studentName = "",
}: ReportViolationModalProps) {
    const form = useForm<ViolationFormValues>({
        resolver: zodResolver(violationSchema),
        defaultValues: {
            name: studentName,
            violationType: "",
            remarks: "",
            date: new Date().toISOString().split("T")[0],
        },
    })

    useEffect(() => {
        if (studentId || studentName) {
            form.reset({
                name: studentName || "",
                violationType: "",
                remarks: "",
                date: new Date().toISOString().split("T")[0],
            })
        }
    }, [studentId, studentName, form])

    async function handleSubmit(values: ViolationFormValues) {
        await onSubmit(values)
        form.reset()
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Report Violation</DialogTitle>
                    <DialogDescription>
                        Fill out the form below to file a violation report.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-4"
                    >
                        <input type="hidden" {...form.register("studentId")} />

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter student name"
                                            {...field}
                                            readOnly={!!studentName}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="date"
                                            {...field}
                                            max={
                                                new Date()
                                                    .toISOString()
                                                    .split("T")[0]
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="violationType"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Type of Violation</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select violation type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="w-full">
                                            {violationTypes.map((type) => (
                                                <SelectItem
                                                    key={type.value}
                                                    value={type.value}
                                                >
                                                    {type.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="remarks"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Remarks</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Add details about the violation"
                                            className="resize-none"
                                            rows={3}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="attachments"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Image attachments (optional)
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={(e) => {
                                                const files = e.target.files
                                                    ? Array.from(e.target.files)
                                                    : []
                                                field.onChange(files)
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button
                                type="submit"
                                disabled={form.formState.isSubmitting}
                            >
                                {form.formState.isSubmitting
                                    ? "Submitting..."
                                    : "Submit"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
