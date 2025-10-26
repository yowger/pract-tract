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
    email: z.string().email("Invalid email address"),
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

            const role = response.user.role

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
                className="space-y-5"
                noValidate
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-700 font-medium">
                                Email address
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
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
                            <FormLabel className="text-gray-700 font-medium">
                                Password
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Enter your password"
                                    className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            className="rounded border-gray-300"
                        />
                        <span className="text-gray-600">Remember me</span>
                    </label>
                    <a
                        href="#"
                        className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                        Forgot password?
                    </a>
                </div>

                <Button
                    type="submit"
                    className="w-full h-11 bg-blue-600 text-white font-medium shadow-lg shadow-blue-500/30"
                    disabled={isPending}
                >
                    {isPending ? (
                        <span className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Signing in...
                        </span>
                    ) : (
                        "Sign in"
                    )}
                </Button>
            </form>
        </Form>
    )
}

export default LoginForm
