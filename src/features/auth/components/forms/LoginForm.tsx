import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { AxiosError } from "axios"

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

import { useLogin } from "@/features/auth/hooks/useLogin"
import { useNavigate } from "react-router-dom"

const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
})

type LoginFormValues = z.infer<typeof loginSchema>

const LoginForm = () => {
    const navigate = useNavigate()

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const { mutateAsync: login, isPending } = useLogin()

    const onSubmit = async (values: LoginFormValues) => {
        try {
            const response = await login({ ...values })

            const role = response.user.user.role

            toast.success("Logged in successfully")

            switch (role) {
                case "student":
                    navigate("/student/dashboard")
                    break
                case "advisor":
                    navigate("/advisor/dashboard")
                    break
                case "agent":
                    navigate("/agent/dashboard")
                    break
                case "director":
                    navigate("/director/dashboard")
                    break
                case "admin":
                    navigate("/admin/dashboard")
                    break
                default:
                    navigate("/")
                    break
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(
                    error?.response?.data?.message ||
                        "Login failed. Please check your credentials."
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
                className="space-y-4"
                noValidate
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="you@example.com"
                                    {...field}
                                />
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
                                <Input
                                    type="password"
                                    placeholder="********"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Logging in..." : "Login"}
                </Button>
            </form>
        </Form>
    )
}

export default LoginForm
