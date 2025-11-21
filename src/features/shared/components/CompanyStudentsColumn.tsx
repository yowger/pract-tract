import type { ColumnDef } from "@tanstack/react-table"
import { Link } from "react-router-dom"
import type { Student } from "@/types/studentList"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

interface CompanyStudentColumnsProps {
    onReportViolation?: (student: Student) => void
    onEvaluate?: (student: Student) => void
}

export const CompanyStudentColumns = ({
    onReportViolation,
    onEvaluate,
}: CompanyStudentColumnsProps): ColumnDef<Student>[] => [
    {
        accessorKey: "user.name",
        header: "Name",
        cell: ({ row }) => {
            const studentId = row.original.id
            const name = row.original.user?.name || "Unknown"

            return (
                <Link
                    to={`/director/students/${studentId}`}
                    className="text-blue-700 hover:underline"
                >
                    {name}
                </Link>
            )
        },
    },
    {
        accessorKey: "user.email",
        header: "Email",
        cell: ({ row }) => <span>{row.original.user?.email}</span>,
    },
    {
        accessorKey: "program.name",
        header: "Program",
        cell: ({ row }) => {
            const program = row.original.program
            return (
                <span title={program?.name || "N/A"}>
                    {program?.code || "N/A"}
                </span>
            )
        },
    },
    {
        accessorKey: "created_at",
        header: "Joined At",
        cell: ({ row }) => {
            const createdAt = new Date(
                row.original.user.created_at
            ).toLocaleDateString()
            return <span>{createdAt}</span>
        },
    },
    {
        id: "actions",
        header: "",
        size: 56,
        cell: ({ row }) => {
            const student = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                onClick={() => onReportViolation?.(student)}
                            >
                                Report Violation
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() => onEvaluate?.(student)}
                            >
                                Evaluate Student
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
