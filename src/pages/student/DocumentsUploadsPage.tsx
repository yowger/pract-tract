import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useCloudinaryBulkUpload } from "@/hooks/use-upload-bulk"
import {
    useCreateStudentDocument,
    type CreateDocumentPayload,
} from "@/features/shared/api/studentDocumentApi"
import { useUser } from "@/features/auth/hooks/useUser"
import { isStudent } from "@/features/auth/types/auth"
import { toast } from "sonner"

const DocumentsUploadsPage = () => {
    const { data: user } = useUser()

    const studentId = user && isStudent(user.user) ? user.user.student.id : null

    const [name, setName] = useState("")
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const { upload, uploading, error, results } = useCloudinaryBulkUpload()
    const createDocument = useCreateStudentDocument()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0])
        }
    }

    const handleUpload = async () => {
        if (!studentId) return

        if (!name.trim()) {
            toast.error("Please enter document name")
            return
        }

        if (!selectedFile) {
            toast.error("Please select a file")
            return
        }

        try {
            const [uploadedFile] = await upload(selectedFile)

            const payload: CreateDocumentPayload = {
                student_id: studentId,
                name,
                type: uploadedFile.resource_type,
                url: uploadedFile.url,
            }

            await createDocument.mutateAsync(payload)

            toast.success("Document uploaded successfully!")
            setName("")
            setSelectedFile(null)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="max-w-xl mx-auto space-y-6">
            <h1 className="text-2xl font-semibold mb-4">Upload Document</h1>

            <div className="space-y-2">
                <Label>Document Name</Label>
                <Input
                    placeholder="Enter document name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="space-y-2">
                <Label>Select File</Label>
                <Input type="file" onChange={handleFileChange} />
            </div>

            <Button
                onClick={handleUpload}
                disabled={uploading || createDocument.isPending}
            >
                {uploading || createDocument.isPending
                    ? "Uploading..."
                    : "Upload"}
            </Button>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            {results.length > 0 && (
                <div className="mt-6 space-y-3">
                    <h2 className="font-semibold text-lg">
                        Uploaded File (Cloudinary)
                    </h2>

                    <div className="border p-3 rounded-lg bg-gray-50">
                        <p className="font-medium">{name}</p>
                        <p className="text-sm text-gray-700">
                            File: {results[0].public_id}.{results[0].format}
                        </p>
                        <a
                            href={results[0].url}
                            target="_blank"
                            className="text-blue-600 underline text-sm"
                        >
                            View File
                        </a>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DocumentsUploadsPage
