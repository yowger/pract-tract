// import { useState } from "react"
// import { Calendar, TrendingUp, Clock, AlertCircle } from "lucide-react"
// import {
//     LineChart,
//     Line,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     Legend,
//     ResponsiveContainer,
//     BarChart,
//     Bar,
// } from "recharts"

// type AttendanceStatus = "present" | "absent" | "late" | "excused"

// interface AttendanceRecord {
//     date: string
//     status: AttendanceStatus
//     timeIn?: string
//     timeOut?: string
//     duration?: string
// }

// interface StudentData {
//     id: string
//     name: string
//     studentId: string
//     totalDays: number
//     presentDays: number
//     absentDays: number
//     lateDays: number
//     excusedDays: number
//     attendancePercentage: number
//     records: AttendanceRecord[]
// }

// const mockStudentData: StudentData = {
//     id: "1",
//     name: "Alex Johnson",
//     studentId: "STU-2024-001",
//     totalDays: 45,
//     presentDays: 38,
//     absentDays: 4,
//     lateDays: 2,
//     excusedDays: 1,
//     attendancePercentage: 84.4,
//     records: [
//         {
//             date: "2024-10-18",
//             status: "present",
//             timeIn: "08:00 AM",
//             timeOut: "03:30 PM",
//             duration: "7h 30m",
//         },
//         {
//             date: "2024-10-17",
//             status: "present",
//             timeIn: "08:05 AM",
//             timeOut: "03:28 PM",
//             duration: "7h 23m",
//         },
//         {
//             date: "2024-10-16",
//             status: "present",
//             timeIn: "08:00 AM",
//             timeOut: "03:32 PM",
//             duration: "7h 32m",
//         },
//         {
//             date: "2024-10-15",
//             status: "late",
//             timeIn: "08:35 AM",
//             timeOut: "03:30 PM",
//             duration: "6h 55m",
//         },
//         { date: "2024-10-14", status: "absent" },
//         {
//             date: "2024-10-11",
//             status: "present",
//             timeIn: "08:02 AM",
//             timeOut: "03:31 PM",
//             duration: "7h 29m",
//         },
//         {
//             date: "2024-10-10",
//             status: "present",
//             timeIn: "08:00 AM",
//             timeOut: "03:30 PM",
//             duration: "7h 30m",
//         },
//         { date: "2024-10-09", status: "excused" },
//         {
//             date: "2024-10-08",
//             status: "present",
//             timeIn: "08:01 AM",
//             timeOut: "03:29 PM",
//             duration: "7h 28m",
//         },
//         { date: "2024-10-07", status: "absent" },
//     ],
// }

// const chartData = [
//     { week: "Week 1", attendance: 78 },
//     { week: "Week 2", attendance: 82 },
//     { week: "Week 3", attendance: 85 },
//     { week: "Week 4", attendance: 88 },
//     { week: "Week 5", attendance: 84 },
//     { week: "Week 6", attendance: 86 },
// ]

// const statusSummary = [
//     { week: "Week 1", present: 4, absent: 1, late: 0 },
//     { week: "Week 2", present: 4, absent: 0, late: 1 },
//     { week: "Week 3", present: 4, absent: 1, late: 0 },
//     { week: "Week 4", present: 5, absent: 0, late: 0 },
//     { week: "Week 5", present: 4, absent: 1, late: 0 },
//     { week: "Week 6", present: 4, absent: 0, late: 1 },
// ]

// // const getStatusColor = (status: AttendanceStatus) => {
// //     switch (status) {
// //         case "present":
// //             return "bg-green-50 border-green-200 text-green-700"
// //         case "absent":
// //             return "bg-red-50 border-red-200 text-red-700"
// //         case "late":
// //             return "bg-yellow-50 border-yellow-200 text-yellow-700"
// //         case "excused":
// //             return "bg-blue-50 border-blue-200 text-blue-700"
// //         default:
// //             return "bg-gray-50 border-gray-200 text-gray-700"
// //     }
// // }

// const getStatusBadge = (status: AttendanceStatus) => {
//     const baseClass = "px-3 py-1 rounded-full text-sm font-medium"
//     switch (status) {
//         case "present":
//             return `${baseClass} bg-green-100 text-green-800`
//         case "absent":
//             return `${baseClass} bg-red-100 text-red-800`
//         case "late":
//             return `${baseClass} bg-yellow-100 text-yellow-800`
//         case "excused":
//             return `${baseClass} bg-blue-100 text-blue-800`
//         default:
//             return `${baseClass} bg-gray-100 text-gray-800`
//     }
// }

// export default function StudentAttendancePage() {
//     const [selectedPeriod, setSelectedPeriod] = useState("month")
//     const student = mockStudentData

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
//             <div className="max-w-6xl mx-auto">
//                 <div className="mb-8">
//                     <h1 className="text-3xl font-bold text-slate-900 mb-2">
//                         {student.name}
//                     </h1>
//                     <p className="text-slate-600">
//                         Student ID: {student.studentId}
//                     </p>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
//                     <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
//                         <div className="flex items-center justify-between">
//                             <div>
//                                 <p className="text-slate-600 text-sm font-medium">
//                                     Total Days
//                                 </p>
//                                 <p className="text-2xl font-bold text-slate-900 mt-1">
//                                     {student.totalDays}
//                                 </p>
//                             </div>
//                             <Calendar className="text-blue-500" size={28} />
//                         </div>
//                     </div>

//                     <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
//                         <div className="flex items-center justify-between">
//                             <div>
//                                 <p className="text-slate-600 text-sm font-medium">
//                                     Present
//                                 </p>
//                                 <p className="text-2xl font-bold text-green-600 mt-1">
//                                     {student.presentDays}
//                                 </p>
//                             </div>
//                             <div className="text-2xl">✓</div>
//                         </div>
//                     </div>

//                     <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
//                         <div className="flex items-center justify-between">
//                             <div>
//                                 <p className="text-slate-600 text-sm font-medium">
//                                     Absent
//                                 </p>
//                                 <p className="text-2xl font-bold text-red-600 mt-1">
//                                     {student.absentDays}
//                                 </p>
//                             </div>
//                             <AlertCircle className="text-red-500" size={28} />
//                         </div>
//                     </div>

//                     <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
//                         <div className="flex items-center justify-between">
//                             <div>
//                                 <p className="text-slate-600 text-sm font-medium">
//                                     Late
//                                 </p>
//                                 <p className="text-2xl font-bold text-yellow-600 mt-1">
//                                     {student.lateDays}
//                                 </p>
//                             </div>
//                             <Clock className="text-yellow-500" size={28} />
//                         </div>
//                     </div>

//                     <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
//                         <div className="flex items-center justify-between">
//                             <div>
//                                 <p className="text-slate-600 text-sm font-medium">
//                                     Attendance Rate
//                                 </p>
//                                 <p className="text-2xl font-bold text-purple-600 mt-1">
//                                     {student.attendancePercentage}%
//                                 </p>
//                             </div>
//                             <TrendingUp className="text-purple-500" size={28} />
//                         </div>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//                     <div className="bg-white rounded-lg shadow p-6">
//                         <h2 className="text-lg font-semibold text-slate-900 mb-4">
//                             Attendance Trend
//                         </h2>
//                         <ResponsiveContainer width="100%" height={300}>
//                             <LineChart data={chartData}>
//                                 <CartesianGrid
//                                     strokeDasharray="3 3"
//                                     stroke="#e2e8f0"
//                                 />
//                                 <XAxis dataKey="week" stroke="#64748b" />
//                                 <YAxis stroke="#64748b" domain={[70, 100]} />
//                                 <Tooltip
//                                     contentStyle={{
//                                         backgroundColor: "#1e293b",
//                                         border: "none",
//                                         borderRadius: "8px",
//                                         color: "#fff",
//                                     }}
//                                 />
//                                 <Legend />
//                                 <Line
//                                     type="monotone"
//                                     dataKey="attendance"
//                                     stroke="#3b82f6"
//                                     strokeWidth={2}
//                                     dot={{ fill: "#3b82f6", r: 5 }}
//                                     activeDot={{ r: 7 }}
//                                 />
//                             </LineChart>
//                         </ResponsiveContainer>
//                     </div>

//                     <div className="bg-white rounded-lg shadow p-6">
//                         <h2 className="text-lg font-semibold text-slate-900 mb-4">
//                             Weekly Breakdown
//                         </h2>
//                         <ResponsiveContainer width="100%" height={300}>
//                             <BarChart data={statusSummary}>
//                                 <CartesianGrid
//                                     strokeDasharray="3 3"
//                                     stroke="#e2e8f0"
//                                 />
//                                 <XAxis dataKey="week" stroke="#64748b" />
//                                 <YAxis stroke="#64748b" />
//                                 <Tooltip
//                                     contentStyle={{
//                                         backgroundColor: "#1e293b",
//                                         border: "none",
//                                         borderRadius: "8px",
//                                         color: "#fff",
//                                     }}
//                                 />
//                                 <Legend />
//                                 <Bar dataKey="present" fill="#10b981" />
//                                 <Bar dataKey="absent" fill="#ef4444" />
//                                 <Bar dataKey="late" fill="#f59e0b" />
//                             </BarChart>
//                         </ResponsiveContainer>
//                     </div>
//                 </div>

//                 <div className="bg-white rounded-lg shadow p-6">
//                     <div className="flex items-center justify-between mb-6">
//                         <h2 className="text-lg font-semibold text-slate-900">
//                             Recent Attendance
//                         </h2>
//                         <select
//                             value={selectedPeriod}
//                             onChange={(e) => setSelectedPeriod(e.target.value)}
//                             className="px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-700 bg-white hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         >
//                             <option value="week">Last Week</option>
//                             <option value="month">Last Month</option>
//                             <option value="all">All Records</option>
//                         </select>
//                     </div>

//                     <div className="overflow-x-auto">
//                         <table className="w-full">
//                             <thead>
//                                 <tr className="border-b border-slate-200">
//                                     <th className="text-left py-3 px-4 font-semibold text-slate-700">
//                                         Date
//                                     </th>
//                                     <th className="text-left py-3 px-4 font-semibold text-slate-700">
//                                         Status
//                                     </th>
//                                     <th className="text-left py-3 px-4 font-semibold text-slate-700">
//                                         Clock In
//                                     </th>
//                                     <th className="text-left py-3 px-4 font-semibold text-slate-700">
//                                         Clock Out
//                                     </th>
//                                     <th className="text-left py-3 px-4 font-semibold text-slate-700">
//                                         Duration
//                                     </th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {student.records.map((record, idx) => (
//                                     <tr
//                                         key={idx}
//                                         className="border-b border-slate-100 hover:bg-slate-50 transition"
//                                     >
//                                         <td className="py-3 px-4 text-slate-900">
//                                             {new Date(
//                                                 record.date
//                                             ).toLocaleDateString("en-US", {
//                                                 weekday: "short",
//                                                 year: "numeric",
//                                                 month: "short",
//                                                 day: "numeric",
//                                             })}
//                                         </td>
//                                         <td className="py-3 px-4">
//                                             <span
//                                                 className={getStatusBadge(
//                                                     record.status
//                                                 )}
//                                             >
//                                                 {record.status
//                                                     .charAt(0)
//                                                     .toUpperCase() +
//                                                     record.status.slice(1)}
//                                             </span>
//                                         </td>
//                                         <td className="py-3 px-4 text-slate-600">
//                                             {record.timeIn || "-"}
//                                         </td>
//                                         <td className="py-3 px-4 text-slate-600">
//                                             {record.timeOut || "-"}
//                                         </td>
//                                         <td className="py-3 px-4 text-slate-600 font-medium">
//                                             {record.duration || "-"}
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

const StudentDashboardPage = () => {
    return <div>StudentDashboardPage</div>
}

export default StudentDashboardPage
