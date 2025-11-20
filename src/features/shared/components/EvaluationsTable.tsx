import { useState } from "react"
import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

interface Question {
    type: "multiple" | "text"
    title: string
    options?: string[]
}

interface Evaluation {
    id: number
    name: string
    description?: string | null
    questions: Question[]
    created_at: string
    updated_at: string
}

interface EvaluationsTableProps {
    data: Evaluation[]
}

export const EvaluationsTable = ({ data }: EvaluationsTableProps) => {
    const [selectedQuestions, setSelectedQuestions] = useState<
        Question[] | null
    >(null)

    const columns: ColumnDef<Evaluation>[] = [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "name", header: "Name" },
        {
            accessorKey: "description",
            header: "Description",
            cell: (info) => info.getValue() || "-",
        },
        {
            accessorKey: "created_at",
            header: "Created At",
            cell: (info) =>
                new Date(info.getValue() as string).toLocaleString(),
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <Button
                    size="sm"
                    onClick={() => setSelectedQuestions(row.original.questions)}
                >
                    View Questions
                </Button>
            ),
        },
    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div>
            <table className="w-full border-collapse border">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className="bg-gray-100">
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="border px-4 py-2 text-left"
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-50">
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="border px-4 py-2">
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <Dialog
                open={!!selectedQuestions}
                onOpenChange={() => setSelectedQuestions(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Questions</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        {selectedQuestions?.map((q, index) => (
                            <div
                                key={index}
                                className="border p-4 rounded bg-white shadow-sm space-y-2"
                            >
                                <p className="font-medium">
                                    {index + 1}. {q.title}
                                </p>
                                {q.type === "text" ? (
                                    <p className="text-gray-500">Text Answer</p>
                                ) : (
                                    <ul className="list-disc pl-5 text-gray-700">
                                        {q.options?.map((opt, i) => (
                                            <li key={i}>{opt}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                    <Button
                        className="mt-4"
                        onClick={() => setSelectedQuestions(null)}
                    >
                        Close
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    )
}
