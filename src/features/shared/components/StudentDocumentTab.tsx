import { useStudentDocuments } from "../api/studentDocumentApi"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

interface StudentDocumentsProps {
    studentId: number
}

export default function StudentDocumentsTable({
    studentId,
}: StudentDocumentsProps) {
    const {
        data: documents,
        isLoading,
        isError,
    } = useStudentDocuments({ studentId })

    return (
        <Card>
            <CardContent className="px-4 py-2">
                <div className="flex justify-end mb-4">
                    <Button asChild>
                        <Link to="/student/documents/create">
                            Upload report
                        </Link>
                    </Button>
                </div>

                {isLoading ? (
                    <p>Loading documents...</p>
                ) : isError ? (
                    <p>Failed to load documents.</p>
                ) : documents?.length === 0 ? (
                    <p>No documents uploaded yet.</p>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">
                                    Action
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {documents?.map((doc) => (
                                <TableRow key={doc.id}>
                                    <TableCell>{doc.name}</TableCell>
                                    <TableCell>{doc.type || "—"}</TableCell>
                                    <TableCell>
                                        {new Date(
                                            doc.created_at
                                        ).toLocaleString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            asChild
                                        >
                                            <a
                                                href={doc.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                View
                                            </a>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    )
}
