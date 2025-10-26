import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Mail, Lock, User, Hash, BookOpen, Users } from "lucide-react"

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRegister } from "@/features/auth/hooks/useRegister"
import { toast } from "sonner"
import { AxiosError } from "axios"

const studentFormSchema = z
    .object({
        name: z.string().min(2, "Name is required"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        password_confirmation: z
            .string()
            .min(8, "Please confirm your password"),
        student_id: z.string().min(3, "Student ID is required"),
        program_id: z.number().min(1, "Program ID required"),
        section_id: z.number().min(1, "Section ID required"),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "Passwords do not match",
        path: ["password_confirmation"],
    })

type StudentFormValues = z.infer<typeof studentFormSchema>

const StudentForm = () => {
    const form = useForm<StudentFormValues>({
        resolver: zodResolver(studentFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            student_id: "",
            program_id: 1,
            section_id: 1,
        },
    })

    const { mutateAsync: register, isPending } = useRegister()

    const onSubmit = async (values: StudentFormValues) => {
        try {
            await register({
                ...values,
                role: "student",
            })

            toast.success("Student registered successfully")
            form.reset()
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(
                    error?.response?.data?.message ||
                        "Failed to register. Please try again."
                )
            } else if (error instanceof Error) {
                toast.error(error.message)
            }
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="bg-white rounded-2xl shadow-sm p-8 space-y-5"
                noValidate
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <Input
                                        {...field}
                                        placeholder="Juan Dela Cruz"
                                        className="pl-11 h-12 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <Input
                                        {...field}
                                        type="email"
                                        placeholder="student@example.com"
                                        className="pl-11 h-12 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <Input
                                        {...field}
                                        type="password"
                                        placeholder="Min. 8 characters"
                                        className="pl-11 h-12 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password_confirmation"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <Input
                                        {...field}
                                        type="password"
                                        placeholder="Re-enter your password"
                                        className="pl-11 h-12 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500">
                            Academic Information
                        </span>
                    </div>
                </div>

                <FormField
                    control={form.control}
                    name="student_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Student ID</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        <Hash className="w-5 h-5" />
                                    </div>
                                    <Input
                                        {...field}
                                        placeholder="e.g., 2025-12345"
                                        className="pl-11 h-12 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="program_id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Program</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                            <BookOpen className="w-5 h-5" />
                                        </div>
                                        <Input
                                            {...field}
                                            type="number"
                                            placeholder="e.g., 3"
                                            className="pl-11 h-12 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="section_id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Section</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                            <Users className="w-5 h-5" />
                                        </div>
                                        <Input
                                            {...field}
                                            type="number"
                                            placeholder="e.g., 12"
                                            className="pl-11 h-12 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-lg font-medium transition-colors mt-6"
                >
                    {isPending ? "Creating Account..." : "Create Account"}
                </Button>
            </form>
        </Form>
    )
}

export default StudentForm
