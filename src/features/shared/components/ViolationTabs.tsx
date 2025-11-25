import { useState } from "react"
import { useViolations } from "../api/violationApi"
import { format } from "date-fns"

interface ViolationsTableProps {
    studentId?: number
    createdBy?: number
    advisorId?: number
}

export default function ViolationsTable({
    studentId,
    createdBy,
    advisorId,
}: ViolationsTableProps) {
    const { data, isLoading, isError } = useViolations({
        studentId,
        createdBy,
        advisorId,
    })
    console.log("🚀 ~ ViolationsTable ~ data:", data)
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

    if (isLoading) return <div>Loading violations...</div>
    if (isError) return <div>Error loading violations.</div>

    const violations = data?.data ?? []

    const handleSortDate = () => {
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
    }

    const sortedViolations = [...violations].sort((a, b) => {
        const aDate = new Date(a.date).getTime()
        const bDate = new Date(b.date).getTime()
        return sortOrder === "asc" ? aDate - bDate : bDate - aDate
    })

    return (
        <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-left">Student</th>
                        <th className="px-4 py-2 text-left">Violation Type</th>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th
                            className="px-4 py-2 text-left cursor-pointer"
                            onClick={handleSortDate}
                        >
                            Date {sortOrder === "asc" ? "↑" : "↓"}
                        </th>
                        <th className="px-4 py-2 text-left">Remarks</th>
                        <th className="px-4 py-2 text-left">Attachments</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {sortedViolations.map((violation) => (
                        <tr key={violation.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2">
                                {violation.student?.user?.name ?? "N/A"}
                            </td>
                            <td className="px-4 py-2">
                                {violation.violation_type}
                            </td>
                            <td className="px-4 py-2">{violation.name}</td>
                            <td className="px-4 py-2">
                                {format(new Date(violation.date), "yyyy-MM-dd")}
                            </td>
                            <td className="px-4 py-2">
                                {violation.remarks ?? "-"}
                            </td>
                            <td className="px-4 py-2 space-x-2">
                                {violation.attachments?.map((url, i) => (
                                    <a
                                        key={i}
                                        href={url}
                                        target="_blank"
                                        className="text-blue-600 underline text-sm"
                                    >
                                        File {i + 1}
                                    </a>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
