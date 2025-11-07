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
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const agentFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(64),
    confirmPassword: z.string().min(8, "Please confirm your password"),
    company_name: z.string().min(1, "Company name is required"),
    company_email: z.string().email("Invalid company email"),
})

export type AgentFormValues = z.infer<typeof agentFormSchema>

interface AgentFormProps {
    onSubmit: (values: AgentFormValues) => void
    disabled?: boolean
}

export function AgentForm({ onSubmit, disabled }: AgentFormProps) {
    const form = useForm<AgentFormValues>({
        resolver: zodResolver(
            agentFormSchema.refine(
                (data) => data.password === data.confirmPassword,
                {
                    message: "Passwords do not match",
                    path: ["confirmPassword"],
                }
            )
        ),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            company_name: "",
            company_email: "",
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
                        Register New Agent
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Create an agent account and its associated company.
                    </p>
                </div>

                <Separator />

                <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter agent name"
                                        {...field}
                                    />
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
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="agent@example.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Repeat password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </section>

                <Separator />

                {/* Company Information */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="company_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="e.g. Acme Agency"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="company_email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="company@example.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </section>

                <Separator />

                <Button
                    type="submit"
                    className="w-full"
                    disabled={disabled || form.formState.isSubmitting}
                >
                    {form.formState.isSubmitting
                        ? "Creating Agent..."
                        : "Create Agent"}
                </Button>
            </form>
        </Form>
    )
}
