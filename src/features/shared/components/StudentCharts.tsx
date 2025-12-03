import type { AttendanceChartsResponse } from "../api/attendanceApi"

interface AttendanceListProps {
    charts: AttendanceChartsResponse
}

export default function StudentCharts({ charts }: AttendanceListProps) {
    return (
        <div className="space-y-4">
            <h2 className="text-lg font-bold">Attendance Summary</h2>

            <div className="overflow-x-auto border rounded">
                <table className="min-w-full text-center border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border">Date</th>
                            <th className="p-2 border">Present</th>
                            <th className="p-2 border">Absent</th>
                            <th className="p-2 border">Late</th>
                            <th className="p-2 border">Excused</th>
                            <th className="p-2 border">Undertime</th>
                        </tr>
                    </thead>
                    <tbody>
                        {charts.lineData.map((d) => (
                            <tr key={d.date} className="odd:bg-gray-50">
                                <td className="p-2 border">{d.date}</td>
                                <td className="p-2 border">{d.present}</td>
                                <td className="p-2 border">{d.absent}</td>
                                <td className="p-2 border">{d.late}</td>
                                <td className="p-2 border">{d.excused}</td>
                                <td className="p-2 border">{d.undertime}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
