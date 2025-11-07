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

const advisorFormSchema = z
    .object({
        name: z.string().min(1, "Name is required"),
        email: z.email("Invalid email address"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters long")
            .max(64),
        confirmPassword: z.string().min(8, "Please confirm your password"),
        phone: z.string().optional(),
        address: z.string().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })

export type AdvisorFormValues = z.infer<typeof advisorFormSchema>

interface AdvisorFormProps {
    onSubmit: (values: AdvisorFormValues) => void
    disabled?: boolean
}

export function AdvisorForm({ onSubmit, disabled }: AdvisorFormProps) {
    const form = useForm<AdvisorFormValues>({
        resolver: zodResolver(advisorFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
            address: "",
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
                        Register New Advisor
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Create an advisor account with user details.
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
                                        placeholder="Enter advisor name"
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
                                        placeholder="advisor@example.com"
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

                <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone (optional)</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="e.g. +639123456789"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address (optional)</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="City, Province"
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
                        ? "Creating Advisor..."
                        : "Create Advisor"}
                </Button>
            </form>
        </Form>
    )
}
