import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useCloudinaryBulkUpload } from "@/hooks/use-upload-bulk"

const DocumentsUploadsPage = () => {
    const [name, setName] = useState("")
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const { upload, uploading, error, results } = useCloudinaryBulkUpload()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFiles(Array.from(e.target.files))
        }
    }

    const handleUpload = async () => {
        if (!name.trim()) {
            alert("Please enter document name")
            return
        }

        if (selectedFiles.length === 0) {
            alert("Please select at least one file")
            return
        }

        await upload(selectedFiles)
        console.log("Uploaded:", results)
    }

    return (
        <div className="max-w-xl mx-auto space-y-6">
            <h1 className="text-2xl font-semibold mb-4">Upload Documents</h1>

            <div className="space-y-2">
                <Label>Document Name</Label>
                <Input
                    placeholder="Enter document name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="space-y-2">
                <Label>Select File(s)</Label>
                <Input type="file" multiple onChange={handleFileChange} />
            </div>

            <Button onClick={handleUpload} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload"}
            </Button>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            {results.length > 0 && (
                <div className="mt-6 space-y-3">
                    <h2 className="font-semibold text-lg">Uploaded Files</h2>

                    {results.map((file, i) => (
                        <div
                            key={i}
                            className="border p-3 rounded-lg bg-gray-50"
                        >
                            <p className="font-medium">{name}</p>
                            <p className="text-sm text-gray-700">
                                File: {file.public_id}.{file.format}
                            </p>
                            <a
                                href={file.url}
                                target="_blank"
                                className="text-blue-600 underline text-sm"
                            >
                                View File
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default DocumentsUploadsPage
