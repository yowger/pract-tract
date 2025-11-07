import { useCreateExcuse, type Excuse } from "@/features/shared/api/excuseApi"
import { ExcuseForm, type ExcuseFormValues } from "./ExcuseCreateForm"
import { useUser } from "@/features/auth/hooks/useUser"
import { isStudent } from "@/features/auth/types/auth"
import { toast } from "sonner"

export function ExcuseCreatePage() {
    const { data: user, isLoading } = useUser()
    const studentId =
        user && isStudent(user?.user) ? user.user.student.id : undefined
    const { mutateAsync: createExcuse, isPending } = useCreateExcuse()

    const handleSubmit = async (values: ExcuseFormValues) => {
        if (!studentId) return

        try {
            const excuseData: Excuse = {
                ...values,
                attendance_id: null,
                images: [],
                student_id: studentId,
            }

            await createExcuse(excuseData)

            toast.success("Successfully created excuse")
        } catch (error) {
            if (error instanceof Error) {
                toast.error("Failed to create excuse")
            }
        }
    }

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="p-6">
            <ExcuseForm
                onSubmit={handleSubmit}
                disabled={isPending}
                hideStudentId
            />
        </div>
    )
}
