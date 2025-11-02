// import React, { useState } from "react"
// import {
//     Mail,
//     Phone,
//     BookOpen,
//     Users,
//     Building2,
//     User as UserIcon,
//     Code,
//     AlertCircle,
//     User,
// } from "lucide-react"
// import { useUser } from "@/features/auth/hooks/useUser"
// import { isStudent } from "@/features/auth/types/auth"
// import type { UserStudent } from "@/types/user"

// const StudentProfilePage: React.FC = () => {
//     const { data: user } = useUser()

//     const [activeTab, setActiveTab] = useState<
//         "overview" | "program" | "company" | "advisor"
//     >("overview")

//     if (!user) {
//         return (
//             <div className="min-h-screen flex items-center justify-center text-gray-700">
//                 You are not logged in.
//             </div>
//         )
//     }

//     if (!isStudent(user.user)) {
//         return (
//             <div className="min-h-screen flex items-center justify-center text-gray-700">
//                 Access denied. You are not a student.
//             </div>
//         )
//     }

//     const userData = user.user

//     const getStatusColor = (isActive: boolean) =>
//         isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"

//     return (
//         <div className="p-6">
//             <div className="max-w-4xl mx-auto">
//                 <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
//                     <div className="flex items-start justify-between">
//                         <div className="flex items-center gap-6">
//                             <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
//                                 <UserIcon className="w-10 h-10 text-white" />
//                             </div>
//                             <div>
//                                 <h1 className="text-3xl font-bold text-gray-900">
//                                     {userData.name}
//                                 </h1>
//                                 <div className="flex items-center gap-3 mt-2">
//                                     <span
//                                         className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
//                                             userData.status === "active"
//                                         )}`}
//                                     >
//                                         {userData.is_active
//                                             ? "Active"
//                                             : "Inactive"}
//                                     </span>
//                                     <span className="text-gray-600 text-sm capitalize bg-indigo-50 px-3 py-1 rounded-full">
//                                         {userData.role}
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="text-right space-y-2">
//                             <p className="text-sm font-semibold text-gray-900">
//                                 Student ID
//                             </p>
//                             <p className="text-xl font-bold text-indigo-600">
//                                 {userData.student.student_id}
//                             </p>
//                         </div>
//                     </div>

//                     {!userData.is_active && (
//                         <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
//                             <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
//                             <p className="text-sm text-red-800">
//                                 This student account is currently inactive.
//                             </p>
//                         </div>
//                     )}
//                 </div>

//                 <div className="flex gap-4 mb-6 overflow-x-auto">
//                     {["overview", "program", "company", "advisor"].map(
//                         (tab) => (
//                             <button
//                                 key={tab}
//                                 onClick={() =>
//                                     setActiveTab(tab as typeof activeTab)
//                                 }
//                                 className={`px-6 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
//                                     activeTab === tab
//                                         ? "bg-indigo-600 text-white shadow-md"
//                                         : "bg-white text-gray-700 hover:bg-gray-50 shadow"
//                                 }`}
//                             >
//                                 {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                             </button>
//                         )
//                     )}
//                 </div>

//                 {activeTab === "overview" && (
//                     <OverviewTab userData={userData} />
//                 )}
//                 {activeTab === "program" && <ProgramTab userData={userData} />}
//                 {activeTab === "company" && <CompanyTab userData={userData} />}
//                 {activeTab === "advisor" && <AdvisorTab userData={userData} />}
//             </div>
//         </div>
//     )
// }

// export default StudentProfilePage

// const OverviewTab: React.FC<{ userData: UserStudent }> = ({ userData }) => (
//     <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
//         <h2 className="text-2xl font-bold text-gray-900 mb-6">
//             Personal Information
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <Field icon={Mail} label="Email" value={userData.email} />
//             <Field icon={UserIcon} label="User ID" value={`#${userData.id}`} />
//             <Field
//                 icon={BookOpen}
//                 label="Student ID"
//                 value={userData.student.student_id}
//                 highlight
//             />
//             <Field
//                 icon={Code}
//                 label="Section"
//                 value={`Section ${userData.student.section.name}`}
//             />
//         </div>
//     </div>
// )

// const ProgramTab: React.FC<{ userData: UserStudent }> = ({ userData }) => (
//     <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
//         <h2 className="text-2xl font-bold text-gray-900 mb-6">
//             Academic Program
//         </h2>
//         <div className="space-y-6">
//             <div className="border-l-4 border-indigo-600 pl-6">
//                 <p className="text-sm text-gray-600 font-medium">
//                     Program Code
//                 </p>
//                 <p className="text-2xl font-bold text-gray-900 mt-1">
//                     {userData.student.program.code}
//                 </p>
//             </div>
//             <div className="border-b pb-6">
//                 <p className="text-sm text-gray-600 font-medium mb-2">
//                     Program Name
//                 </p>
//                 <p className="text-xl font-semibold text-gray-900">
//                     {userData.student.program.name}
//                 </p>
//             </div>
//             <div>
//                 <p className="text-sm text-gray-600 font-medium mb-3">
//                     Description
//                 </p>
//                 <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
//                     {userData.student.program.description}
//                 </p>
//             </div>
//         </div>
//     </div>
// )

// const CompanyTab: React.FC<{ userData: UserStudent }> = ({ userData }) => {
//     const company = userData.student?.company

//     if (!company) {
//         return (
//             <div className="bg-white rounded-lg shadow-lg p-8 text-center">
//                 <p className="text-gray-600">No company assigned yet.</p>
//                 <p className="text-sm text-gray-500 mt-2">
//                     Once your company has been assigned, its details will appear
//                     here.
//                 </p>
//             </div>
//         )
//     }

//     return (
//         <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Company</h2>

//             <Field icon={Building2} label="Company Name" value={company.name} />
//             <Field
//                 icon={Mail}
//                 label="Company Email"
//                 value={company.email || "Not provided"}
//             />
//             <Field
//                 icon={Phone}
//                 label="Company Phone"
//                 value={company.phone || "Not provided"}
//             />
//             <Field
//                 icon={Building2}
//                 label="Company Address"
//                 value={company.address || "Not provided"}
//             />

//             <div className="border-t pt-4">
//                 <p className="text-sm text-gray-600 font-medium mb-2">
//                     Description
//                 </p>
//                 <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
//                     {company.description || "No description provided"}
//                 </p>
//             </div>
//         </div>
//     )
// }
// const AdvisorTab: React.FC<{ userData: UserStudent }> = ({ userData }) => {
//     const advisor = userData.student.advisor

//     if (!advisor) {
//         return (
//             <div className="bg-white rounded-lg shadow-lg p-8 text-center space-y-3">
//                 <Users className="w-12 h-12 text-gray-400 mx-auto" />
//                 <p className="text-gray-700 font-medium text-lg">
//                     No advisor assigned yet
//                 </p>
//                 <p className="text-sm text-gray-500 max-w-md mx-auto">
//                     Once your academic advisor has been assigned, their details
//                     will appear here.
//                 </p>
//             </div>
//         )
//     }

//     const advisorUser = advisor.user

//     return (
//         <div className="bg-white rounded-lg shadow-lg p-8">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                 Academic Advisor
//             </h2>

//             <div className="space-y-6">
//                 <div className="flex items-start gap-6 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
//                     <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
//                         <Users className="w-8 h-8 text-white" />
//                     </div>
//                     <div className="flex-1">
//                         <p className="text-lg font-bold text-gray-900">
//                             {advisorUser?.name || "Unnamed Advisor"}
//                         </p>
//                         <div className="flex items-center gap-2 mt-2">
//                             <span
//                                 className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                                     advisorUser?.is_active
//                                         ? "bg-green-100 text-green-800"
//                                         : "bg-red-100 text-red-800"
//                                 }`}
//                             >
//                                 {advisorUser?.is_active ? "Active" : "Inactive"}
//                             </span>
//                             {advisorUser?.status && (
//                                 <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 capitalize">
//                                     {advisorUser.status}
//                                 </span>
//                             )}
//                         </div>
//                         <p className="text-sm text-gray-600 mt-2 capitalize">
//                             Role: {advisorUser?.role || "N/A"}
//                         </p>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="flex items-start gap-4">
//                         <Mail className="w-5 h-5 text-indigo-600 mt-1" />
//                         <div className="flex-1">
//                             <p className="text-sm text-gray-600 font-medium">
//                                 Email
//                             </p>
//                             <p className="text-gray-900 mt-1">
//                                 {advisorUser?.email || "Not provided"}
//                             </p>
//                         </div>
//                     </div>

//                     <div className="flex items-start gap-4">
//                         <Phone className="w-5 h-5 text-indigo-600 mt-1" />
//                         <div className="flex-1">
//                             <p className="text-sm text-gray-600 font-medium">
//                                 Phone
//                             </p>
//                             <p className="text-gray-900 mt-1">
//                                 {advisorUser?.phone || "Not provided"}
//                             </p>
//                         </div>
//                     </div>

//                     <div className="flex items-start gap-4">
//                         <Building2 className="w-5 h-5 text-indigo-600 mt-1" />
//                         <div className="flex-1">
//                             <p className="text-sm text-gray-600 font-medium">
//                                 Address
//                             </p>
//                             <p className="text-gray-900 mt-1">
//                                 {advisorUser?.address || "Not provided"}
//                             </p>
//                         </div>
//                     </div>

//                     <div className="flex items-start gap-4">
//                         <User className="w-5 h-5 text-indigo-600 mt-1" />
//                         <div className="flex-1">
//                             <p className="text-sm text-gray-600 font-medium">
//                                 User ID
//                             </p>
//                             <p className="text-gray-900 mt-1">
//                                 #{advisorUser?.id || "N/A"}
//                             </p>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
//                     <div className="p-4 bg-indigo-50 rounded-lg">
//                         <p className="text-xs text-gray-600 font-medium">
//                             Advisor ID
//                         </p>
//                         <p className="text-lg font-semibold text-indigo-600 mt-2">
//                             #{advisor.id}
//                         </p>
//                     </div>

//                     <div className="p-4 bg-purple-50 rounded-lg">
//                         <p className="text-xs text-gray-600 font-medium">
//                             Status
//                         </p>
//                         <p className="text-lg font-semibold text-purple-600 mt-2 capitalize">
//                             {advisorUser?.status || "N/A"}
//                         </p>
//                     </div>

//                     <div className="p-4 bg-green-50 rounded-lg">
//                         <p className="text-xs text-gray-600 font-medium">
//                             Account Status
//                         </p>
//                         <p
//                             className={`text-lg font-semibold mt-2 ${
//                                 advisorUser?.is_active
//                                     ? "text-green-600"
//                                     : "text-red-600"
//                             }`}
//                         >
//                             {advisorUser?.is_active ? "Active" : "Inactive"}
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// const Field: React.FC<{
//     icon: React.ElementType
//     label: string
//     value: string
//     highlight?: boolean
// }> = ({ icon: Icon, label, value, highlight }) => (
//     <div className="flex items-start gap-4">
//         <Icon className="w-5 h-5 text-indigo-600 mt-1" />
//         <div>
//             <p className="text-sm text-gray-600 font-medium">{label}</p>
//             <p
//                 className={`mt-1 ${
//                     highlight
//                         ? "font-semibold text-indigo-600"
//                         : "text-gray-900"
//                 }`}
//             >
//                 {value}
//             </p>
//         </div>
//     </div>
// )

import { Calendar, CheckSquare, Home } from "lucide-react"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { formatDate, formatTime } from "@/utils/utils"
import ProfileHeader from "@/features/shared/components/ProfileHeader"

import { Card, CardContent } from "@/components/ui/card"
import { useStudent } from "@/features/shared/hooks/useStudent"
import { useUser } from "@/features/auth/hooks/useUser"
import StudentProfileCard from "@/features/shared/components/StudentProfileCard"
import WorkScheduleCard from "@/features/shared/components/WorkScheduleCard"
import StudentAttendanceInfoCard from "@/features/shared/components/StudentAttendanceInfoCard"
import { isStudent } from "@/features/auth/types/auth"

const StudentProfilePage = () => {
    const { data: user } = useUser()

    const studentId =
        user && isStudent(user?.user) ? user.user.student.id : null

    const { data: student, isLoading } = useStudent(Number(studentId))

    if (isLoading) return <div>Loading...</div>
    if (!student) return <div>Student not found.</div>

    const userData = student.user
    const studentSchedule = student?.company?.schedule

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-700">
                You are not logged in.
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto px-4 space-y-6">
            <ProfileHeader
                name={userData.name}
                status={userData.is_active ? "active" : "inactive"}
                role={"student"}
                id={userData.id}
            />

            <Tabs defaultValue="info">
                <TabsList className="bg-gray-100 rounded-lg mb-6">
                    <TabsList className="bg-gray-100 rounded-lg">
                        <TabsTrigger
                            value="info"
                            className="flex items-center gap-2"
                        >
                            <Home className="w-4 h-4" /> Info
                        </TabsTrigger>
                        <TabsTrigger
                            value="schedule"
                            className="flex items-center gap-2"
                        >
                            <Calendar className="w-4 h-4" /> Schedule
                        </TabsTrigger>
                        <TabsTrigger
                            value="attendance"
                            className="flex items-center gap-2"
                        >
                            <CheckSquare className="w-4 h-4" /> Attendance
                        </TabsTrigger>
                    </TabsList>
                </TabsList>
                {/* 
                <TabsContent value="company">
                    <CompanyInfoCard
                        name={company.name}
                        email={company.email}
                        phone={company.phone}
                        address={company.address}
                        isActive={company.is_active}
                        studentsCount={company.students_count}
                    />
                </TabsContent> */}

                <TabsContent value="info">
                    <StudentProfileCard
                        student={student}
                        formatDate={formatDate}
                    />
                </TabsContent>

                <TabsContent value="schedule">
                    {studentSchedule ? (
                        <WorkScheduleCard
                            schedule={studentSchedule}
                            formatDate={formatDate}
                            formatTime={formatTime}
                        />
                    ) : (
                        <Card>
                            <CardContent>
                                <p>
                                    No schedule has been assigned to this
                                    student yet.
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>

                <TabsContent value="attendance">
                    {student.company_id === null ? (
                        <Card>
                            <CardContent>
                                <p>
                                    No company has been assigned to this student
                                    yet.
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        <StudentAttendanceInfoCard
                            userId={student.user.id}
                            studentId={student.student_id}
                            companyId={student.company_id}
                        />
                    )}
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default StudentProfilePage
