import { useCreateExcuse } from "@/features/shared/api/excuseApi"
import { ExcuseForm, type ExcuseFormValues } from "./ExcuseCreateForm"
import { useUser } from "@/features/auth/hooks/useUser"
import { isStudent } from "@/features/auth/types/auth"
import { toast } from "sonner"
import { useCloudinaryBulkUpload } from "@/hooks/use-upload-bulk"

export function ExcuseCreatePage() {
    const { data: user, isLoading } = useUser()
    const studentId =
        user && isStudent(user?.user) ? user.user.student.id : undefined
    const { mutateAsync: createExcuse } = useCreateExcuse()
    const { upload, uploading, error: uploadError } = useCloudinaryBulkUpload()

    const handleSubmit = async (values: ExcuseFormValues) => {
        if (!studentId) return

        try {
            const uploadedFiles = values.files?.length
                ? await upload(values.files)
                : []

            const uploadedPhotos = values.photos?.length
                ? await upload(values.photos)
                : []

            const attachments = [
                ...uploadedFiles.map((file, i) => ({
                    type: "file",
                    name: values.files![i].name,
                    url: file.url,
                })),
                ...uploadedPhotos.map((_file, i) => ({
                    type: "image",
                    name: values.photos![i].name,
                    url: uploadedPhotos[i].url,
                })),
            ]

            const payload = {
                student_id: studentId,
                reason: values.reason,
                description: values.reason,
                title: values.title,
                date: values.date.toISOString().split("T")[0],
                attachments,
            }

            await createExcuse(payload)

            toast.success("Successfully created excuse")
        } catch (err) {
            console.error(err)
            toast.error(
                uploadError ?? "Failed to create excuse, please try again"
            )
        }
    }

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="p-6 space-y-6 max-w-2xl mx-auto">
            <ExcuseForm onSubmit={handleSubmit} />

            {uploading && (
                <p className="text-sm text-muted-foreground">
                    Uploading files...
                </p>
            )}
        </div>
    )
}
