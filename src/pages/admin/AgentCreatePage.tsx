import { useCreateAgent } from "@/features/admin/api/agentsApi"
import {
    AgentForm,
    type AgentFormValues,
} from "@/features/admin/components/AgentForm"
import { AxiosError } from "axios"
import { toast } from "sonner"

export default function AgentCreatePage() {
    const createAgent = useCreateAgent()

    const handleSubmit = async (data: AgentFormValues) => {
        try {
            await createAgent.mutateAsync({
                name: data.name,
                email: data.email,
                password: data.password,
                company_name: data.company_name,
                company_email: data.company_email,
            })
            toast.success("Agent successfully created!")
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(
                    error?.response?.data?.message ?? "Failed to create agent."
                )
            }
        }
    }

    return (
        <div className="p-6">
            <AgentForm
                onSubmit={handleSubmit}
                disabled={createAgent.isPending}
            />
        </div>
    )
}
