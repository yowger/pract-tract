import { useCreateAdvisor } from "@/features/admin/api/advisorApi"
import {
    AdvisorForm,
    type AdvisorFormValues,
} from "@/features/admin/components/AdvisorForn"
import { toast } from "sonner"

export default function AdvisorCreatePage() {
    const { mutateAsync, isPending } = useCreateAdvisor()

    const handleSubmit = async (values: AdvisorFormValues) => {
        try {
            await mutateAsync({
                name: values.name,
                email: values.email,
                password: values.password,
                phone: values.phone,
                address: values.address,
            })
            toast.success("Advisor created successfully!")
        } catch (err) {
            if (err instanceof Error) {
                toast.error("Failed to create advisor.")
            }
        }
    }

    return <AdvisorForm onSubmit={handleSubmit} disabled={isPending} />
}
