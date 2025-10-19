import { AgentAttendanceColumns } from "@/features/agent/components/AgentAttendanceColumn"
import DataTable from "@/features/shared/components/Datatable"
import { useAttendances } from "@/features/shared/hooks/useAttendance"

const AgentAttendancePage = () => {
    const {
        data: attendances,
        isLoading,
        isError,
    } = useAttendances({
        page: 1,
        per_page: 10,
    })
    console.log("🚀 ~ AgentAttendancePage ~ attendances:", attendances)

    return (
        <div>
            AgentAttendancePage
            <DataTable
                data={attendances?.data || []}
                columns={AgentAttendanceColumns}
                isLoading={isLoading}
            />
        </div>
    )
}

export default AgentAttendancePage
