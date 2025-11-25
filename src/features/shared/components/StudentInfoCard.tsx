import { useState } from "react"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import DataTable from "./Datatable"
import { useStudents } from "@/features/director/hooks/useStudents"
import type { StudentQueryParams } from "@/features/director/api/studentApi"
import { CompanyStudentColumns } from "./CompanyStudentsColumn"
import type { Student } from "@/types/studentList"
import StudentEvaluationModal from "./StudentEvaluationModal"
import { useUser } from "@/features/auth/hooks/useUser"
import { getUserRole } from "@/features/auth/types/auth"
import type { UserRole } from "@/types/roles"

import { ReportViolationModal } from "./ReportViolationModal"
import { useCloudinaryBulkUpload } from "@/hooks/use-upload-bulk"
import { useCreateViolation } from "../api/violationApi"
import { toast } from "sonner"

const StudentInfoCard = ({ companyId }: { companyId: number }) => {
    const [filters, setFilters] = useState<StudentQueryParams>({
        page: 1,
        per_page: 10,
        company_id: companyId,
    })

    const { data: students, isLoading } = useStudents(filters)
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

    const [openViolationForm, setOpenViolationForm] = useState(false)
    const [violationStudent, setViolationStudent] = useState<Student | null>(
        null
    )
    const { upload } = useCloudinaryBulkUpload()
    const { mutateAsync: createViolation } = useCreateViolation()

    const { data: currentUser } = useUser()
    const role = currentUser?.user ? getUserRole(currentUser.user) : undefined

    const onReportViolation = (student: Student) => {
        setViolationStudent(student)
        setOpenViolationForm(true)
    }

    return (
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
            <ScrollArea type="always" className="w-full overflow-x-auto">
                <DataTable
                    data={students ? students.data : []}
                    columns={CompanyStudentColumns({
                        onReportViolation: onReportViolation,
                        onEvaluate: (student) => setSelectedStudent(student),
                        role: role as UserRole,
                    })}
                    isLoading={isLoading}
                    manualPagination
                    pageCount={students?.meta.last_page}
                    totalItems={students?.meta.total}
                    pagination={{
                        pageIndex: filters.page - 1,
                        pageSize: filters.per_page,
                    }}
                    onPageChange={(page) => setFilters((f) => ({ ...f, page }))}
                    onPageSizeChange={(size) =>
                        setFilters((f) => ({ ...f, per_page: size }))
                    }
                />
                <ScrollBar orientation="horizontal" />
            </ScrollArea>

            {selectedStudent && (
                <StudentEvaluationModal
                    student={selectedStudent}
                    companyId={companyId}
                    onClose={() => setSelectedStudent(null)}
                />
            )}

            {violationStudent && (
                <ReportViolationModal
                    open={openViolationForm}
                    onOpenChange={setOpenViolationForm}
                    studentId={violationStudent?.student_id}
                    studentName={violationStudent?.user.name}
                    onSubmit={async (values) => {
                        if (!violationStudent) return
                        try {
                            let attachmentUrls: string[] = []
                            if (values.attachments?.length) {
                                const uploaded = await upload(
                                    values.attachments
                                )
                                attachmentUrls = uploaded.map((u) => u.url)
                            }

                            await createViolation({
                                date: values.date,
                                remarks: values.remarks,
                                violation_type: values.violationType,
                                name: values.name,
                                student_id: violationStudent.id,
                                attachments: attachmentUrls,
                            })

                            toast.success("Violation reported successfully")
                            setOpenViolationForm(false)
                        } catch (err) {
                            console.error("Failed to report violation:", err)
                            toast.error("Failed to report violation")
                        }
                    }}
                />
            )}
        </div>
    )
}

export default StudentInfoCard
