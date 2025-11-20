import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"
import DataTable from "@/features/shared/components/Datatable"
import { useCompanies } from "@/features/director/hooks/useCompanies"
import { CompanyColumns } from "@/features/director/components/CompanyColumn"
import {
    useAssignEvaluation,
    useEvaluations,
} from "@/features/shared/api/evaluationsApi"
import { toast } from "sonner"

export const CompanyManagementPage = () => {
    const [filters] = useState({
        page: 1,
        per_page: 10,
        search: "",
        is_active: undefined,
    })
    const [open, setOpen] = useState(false)
    const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(
        null
    )
    const [selectedEvaluationId, setSelectedEvaluationId] = useState<
        number | null
    >(null)

    const { data: companiesData, isLoading } = useCompanies(filters)
    console.log("🚀 ~ CompanyManagementPage ~ companiesData:", companiesData)
    const { data: evaluations } = useEvaluations()
    const assignMutation = useAssignEvaluation()

    const handleAssignEvaluation = (companyId: number) => {
        setSelectedCompanyId(companyId)
        setOpen(true)
    }

    const handleSubmit = async () => {
        if (!selectedCompanyId || !selectedEvaluationId) return

        try {
            await assignMutation.mutateAsync({
                evaluationId: selectedEvaluationId,
                payload: {
                    user_ids: [selectedCompanyId],
                },
            })
            setOpen(false)
            toast.success("Evaluation assigned successfully.")
        } catch (error) {
            toast.error("Failed to assign evaluation")
            console.error("Assign evaluation error:", error)
        }
    }

    return (
        <div className="space-y-4">
            <h1 className="text-xl font-semibold">Companies</h1>

            <DataTable
                data={companiesData?.data ?? []}
                columns={CompanyColumns.map((col) => ({
                    ...col,
                    ...(col.header === "Actions" ? {} : {}),
                })).concat({
                    header: "Actions",
                    cell: ({ row }) => (
                        <Button
                            onClick={() =>
                                handleAssignEvaluation(
                                    Number(row.original.user_id)
                                )
                            }
                        >
                            Assign Evaluation
                        </Button>
                    ),
                })}
                isLoading={isLoading}
                manualPagination
                pageCount={companiesData?.meta?.last_page ?? 1}
                totalItems={companiesData?.meta?.total ?? 0}
            />

            {open && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-md w-[400px] space-y-4">
                        <h2 className="text-lg font-semibold">
                            Assign Evaluation
                        </h2>
                        <Select
                            onValueChange={(val) =>
                                setSelectedEvaluationId(Number(val))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Evaluation" />
                            </SelectTrigger>
                            <SelectContent className="w-full">
                                {evaluations?.map((ev) => (
                                    <SelectItem
                                        key={ev.id}
                                        value={ev.id.toString() || ""}
                                    >
                                        {ev.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <div className="flex justify-end gap-2">
                            <Button
                                onClick={() => setOpen(false)}
                                variant="outline"
                            >
                                Cancel
                            </Button>
                            <Button onClick={handleSubmit}>Assign</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CompanyManagementPage
