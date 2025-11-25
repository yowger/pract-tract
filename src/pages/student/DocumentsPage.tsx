import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useUser } from "@/features/auth/hooks/useUser"

const DocumentsPage = () => {
    const { data } = useUser()
    console.log("🚀 ~ DocumentsPage ~ data:", data)

    return (
        <div className="p-4">
            <div className="flex justify-end">
                <Button asChild>
                    <Link to="create">Upload report</Link>
                </Button>
            </div>

            <div className="mt-4">DocumentsPage</div>
        </div>
    )
}

export default DocumentsPage
