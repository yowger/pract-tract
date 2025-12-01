import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Mail, Lock, User, BookOpen } from "lucide-react"

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const advisorFormSchema = z
    .object({
        name: z.string().min(2, "Full name is required"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        password_confirmation: z
            .string()
            .min(8, "Please confirm your password"),
        program_id: z.number().min(1, "Program is required"),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "Passwords do not match",
        path: ["password_confirmation"],
    })

type AdvisorFormValues = z.infer<typeof advisorFormSchema>

export default function AdvisorForm() {
    const form = useForm<AdvisorFormValues>({
        resolver: zodResolver(advisorFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
        },
    })

    const { mutateAsync: register, isPending } = useRegister()

    const onSubmit = async (values: AdvisorFormValues) => {
        try {
            await register({
                ...values,
                role: "advisor",
            })
            toast.success("Advisor registered successfully")
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
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <Input
                                        {...field}
                                        placeholder="Juan Dela Cruz"
                                        className="pl-11 h-12"
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
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <Input
                                        {...field}
                                        type="email"
                                        placeholder="advisor@example.com"
                                        className="pl-11 h-12"
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="program_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Program</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

                                    <Select
                                        onValueChange={(v) =>
                                            field.onChange(Number(v))
                                        }
                                        defaultValue={String(field.value)}
                                    >
                                        <SelectTrigger className="pl-11 h-12 w-full">
                                            <SelectValue placeholder="Select program" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectItem value="1">
                                                BSCRIM
                                            </SelectItem>
                                            <SelectItem value="2">
                                                BSISM
                                            </SelectItem>
                                            <SelectItem value="3">
                                                BSIT
                                            </SelectItem>
                                            <SelectItem value="4">
                                                BSA
                                            </SelectItem>
                                            <SelectItem value="5">
                                                BSED-MATH
                                            </SelectItem>
                                            <SelectItem value="6">
                                                BSED-FIL
                                            </SelectItem>
                                            <SelectItem value="7">
                                                BSED-ENG
                                            </SelectItem>
                                            <SelectItem value="8">
                                                BPED
                                            </SelectItem>
                                            <SelectItem value="9">
                                                BEED
                                            </SelectItem>
                                            <SelectItem value="10">
                                                BAELS
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
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
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <Input
                                        {...field}
                                        type="password"
                                        placeholder="Min. 8 characters"
                                        className="pl-11 h-12"
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
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <Input
                                        {...field}
                                        type="password"
                                        placeholder="Re-enter password"
                                        className="pl-11 h-12"
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-lg font-medium transition-colors mt-6"
                >
                    {isPending
                        ? "Creating Account..."
                        : "Create Advisor Account"}
                </Button>
            </form>
        </Form>
    )
}
