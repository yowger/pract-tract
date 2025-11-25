import ViolationsTable from "@/features/shared/components/ViolationTabs"

const StudentViolationsPage = ({ studentId }: { studentId: number }) => {
    return <ViolationsTable studentId={studentId} />
}

export default StudentViolationsPage
