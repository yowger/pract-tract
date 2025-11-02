// import { useState } from "react"
// import {
//     Mail,
//     Phone,
//     MapPin,
//     Building2,
//     Calendar,
//     Clock,
//     User,
//     Shield,
// } from "lucide-react"
// import { useUser } from "@/features/auth/hooks/useUser"
// import { isAgent } from "@/features/auth/types/auth"

// const AgentProfilePage = () => {
//     const { data: user, isLoading } = useUser()
//     const [activeTab, setActiveTab] = useState("overview")

//     if (isLoading) return <div>Loading...</div>
//     if (!user) return <div>Not authenticated</div>
//     if (!isAgent(user.user)) return <div>Unauthorized — Agents only</div>

//     const userData = user.user

//     const formatTime = (time?: string): string => {
//         if (!time) return "—"
//         return new Date(`2025-01-01T${time}`).toLocaleTimeString("en-US", {
//             hour: "2-digit",
//             minute: "2-digit",
//             hour12: true,
//         })
//     }

//     const formatDate = (dateString?: string): string => {
//         if (!dateString) return "—"
//         return new Date(dateString).toLocaleDateString("en-US", {
//             year: "numeric",
//             month: "long",
//             day: "numeric",
//         })
//     }

//     const getStatusColor = (status: string) => {
//         return status === "active"
//             ? "bg-green-100 text-green-800"
//             : "bg-gray-100 text-gray-800"
//     }

//     const company = userData?.agent?.company
//     const schedule = company?.schedule

//     return (
//         <div className="p-6">
//             <div className="max-w-4xl mx-auto">
//                 <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
//                     <div className="flex items-start justify-between">
//                         <div className="flex items-center gap-6">
//                             <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
//                                 <User className="w-10 h-10 text-white" />
//                             </div>
//                             <div>
//                                 <h1 className="text-3xl font-bold text-gray-900">
//                                     {userData.name}
//                                 </h1>
//                                 <div className="flex items-center gap-3 mt-2">
//                                     <span
//                                         className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
//                                             userData.status
//                                         )}`}
//                                     >
//                                         {userData.status
//                                             ? userData.status
//                                                   .charAt(0)
//                                                   .toUpperCase() +
//                                               userData.status.slice(1)
//                                             : "Unknown"}
//                                     </span>
//                                     <span className="text-gray-600 text-sm capitalize">
//                                         {userData.role}
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="text-right text-sm text-gray-500">
//                             ID: {userData.id}
//                         </div>
//                     </div>
//                 </div>

//                 <div className="flex gap-4 mb-6">
//                     {["overview", "company", "schedule"].map((tab) => (
//                         <button
//                             key={tab}
//                             onClick={() => setActiveTab(tab)}
//                             className={`px-6 py-2 rounded-lg font-medium transition-all ${
//                                 activeTab === tab
//                                     ? "bg-blue-600 text-white shadow-md"
//                                     : "bg-white text-gray-700 hover:bg-gray-50 shadow"
//                             }`}
//                         >
//                             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                         </button>
//                     ))}
//                 </div>

//                 {activeTab === "overview" && (
//                     <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
//                         <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                             Personal Information
//                         </h2>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div className="flex items-center gap-4">
//                                 <Mail className="w-5 h-5 text-blue-600" />
//                                 <div>
//                                     <p className="text-sm text-gray-600">
//                                         Email
//                                     </p>
//                                     <p className="font-medium text-gray-900">
//                                         {userData.email || "Not provided"}
//                                     </p>
//                                 </div>
//                             </div>

//                             <div className="flex items-center gap-4">
//                                 <Phone className="w-5 h-5 text-blue-600" />
//                                 <div>
//                                     <p className="text-sm text-gray-600">
//                                         Phone
//                                     </p>
//                                     <p className="font-medium text-gray-900">
//                                         {userData.phone || "Not provided"}
//                                     </p>
//                                 </div>
//                             </div>

//                             <div className="flex items-center gap-4">
//                                 <Shield className="w-5 h-5 text-blue-600" />
//                                 <div>
//                                     <p className="text-sm text-gray-600">
//                                         Role
//                                     </p>
//                                     <p className="font-medium text-gray-900 capitalize">
//                                         {userData.role}
//                                     </p>
//                                 </div>
//                             </div>

//                             <div className="flex items-center gap-4">
//                                 <Calendar className="w-5 h-5 text-blue-600" />
//                                 <div>
//                                     <p className="text-sm text-gray-600">
//                                         Member Since
//                                     </p>
//                                     <p className="font-medium text-gray-900">
//                                         {formatDate(userData.created_at)}
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {activeTab === "company" && company && (
//                     <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
//                         <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                             Company Information
//                         </h2>

//                         <div className="space-y-6">
//                             <div className="flex items-center gap-4">
//                                 <Building2 className="w-5 h-5 text-blue-600" />
//                                 <div>
//                                     <p className="text-sm text-gray-600">
//                                         Company Name
//                                     </p>
//                                     <p className="font-medium text-gray-900">
//                                         {company.name}
//                                     </p>
//                                 </div>
//                             </div>

//                             <div className="flex items-center gap-4">
//                                 <Mail className="w-5 h-5 text-blue-600" />
//                                 <div>
//                                     <p className="text-sm text-gray-600">
//                                         Company Email
//                                     </p>
//                                     <p className="font-medium text-gray-900">
//                                         {company.email || "Not provided"}
//                                     </p>
//                                 </div>
//                             </div>

//                             <div className="flex items-center gap-4">
//                                 <Phone className="w-5 h-5 text-blue-600" />
//                                 <div>
//                                     <p className="text-sm text-gray-600">
//                                         Company Phone
//                                     </p>
//                                     <p className="font-medium text-gray-900">
//                                         {company.phone || "Not provided"}
//                                     </p>
//                                 </div>
//                             </div>

//                             <div className="flex items-center gap-4">
//                                 <MapPin className="w-5 h-5 text-blue-600" />
//                                 <div>
//                                     <p className="text-sm text-gray-600">
//                                         Company Address
//                                     </p>
//                                     <p className="font-medium text-gray-900">
//                                         {company.address || "Not provided"}
//                                     </p>
//                                 </div>
//                             </div>

//                             <div className="pt-4 border-t">
//                                 <p className="text-sm text-gray-600">
//                                     Company Active Status
//                                 </p>
//                                 <span
//                                     className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${
//                                         company.is_active
//                                             ? "bg-green-100 text-green-800"
//                                             : "bg-red-100 text-red-800"
//                                     }`}
//                                 >
//                                     {company.is_active ? "Active" : "Inactive"}
//                                 </span>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {activeTab === "schedule" && (
//                     <>
//                         {schedule ? (
//                             <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
//                                 <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                                     Work Schedule
//                                 </h2>

//                                 <div className="space-y-6">
//                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                         <div className="p-4 bg-slate-50 rounded-lg">
//                                             <p className="text-sm text-gray-600 mb-2">
//                                                 Schedule Period
//                                             </p>
//                                             <p className="font-medium text-gray-900">
//                                                 {formatDate(
//                                                     schedule.start_date
//                                                 )}{" "}
//                                                 -{" "}
//                                                 {formatDate(schedule.end_date)}
//                                             </p>
//                                         </div>

//                                         <div className="p-4 bg-slate-50 rounded-lg">
//                                             <p className="text-sm text-gray-600 mb-2">
//                                                 Working Days
//                                             </p>
//                                             <p className="font-medium text-gray-900 capitalize">
//                                                 {Array.isArray(
//                                                     schedule.day_of_week
//                                                 )
//                                                     ? schedule.day_of_week.join(
//                                                           ", "
//                                                       )
//                                                     : "Not set"}
//                                             </p>
//                                         </div>
//                                     </div>

//                                     <div className="border-t pt-6">
//                                         <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                                             Shift Times
//                                         </h3>

//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                             <div className="space-y-3">
//                                                 <p className="font-semibold text-gray-900 flex items-center gap-2">
//                                                     <Clock className="w-4 h-4" />{" "}
//                                                     Morning Shift
//                                                 </p>
//                                                 <div className="space-y-2 pl-6">
//                                                     <p className="text-sm">
//                                                         <span className="text-gray-600">
//                                                             In:
//                                                         </span>{" "}
//                                                         <span className="font-medium">
//                                                             {formatTime(
//                                                                 schedule.am_time_in
//                                                             )}
//                                                         </span>
//                                                     </p>
//                                                     <p className="text-sm">
//                                                         <span className="text-gray-600">
//                                                             Out:
//                                                         </span>{" "}
//                                                         <span className="font-medium">
//                                                             {formatTime(
//                                                                 schedule.am_time_out
//                                                             )}
//                                                         </span>
//                                                     </p>
//                                                     <p className="text-sm">
//                                                         <span className="text-gray-600">
//                                                             Grace Period:
//                                                         </span>{" "}
//                                                         <span className="font-medium">
//                                                             {
//                                                                 schedule.am_grace_period_minutes
//                                                             }{" "}
//                                                             mins
//                                                         </span>
//                                                     </p>
//                                                     <p className="text-sm">
//                                                         <span className="text-gray-600">
//                                                             undertime grace:
//                                                         </span>{" "}
//                                                         <span className="font-medium">
//                                                             {
//                                                                 schedule.am_undertime_grace_minutes
//                                                             }{" "}
//                                                             mins
//                                                         </span>
//                                                     </p>
//                                                 </div>
//                                             </div>

//                                             <div className="space-y-3">
//                                                 <p className="font-semibold text-gray-900 flex items-center gap-2">
//                                                     <Clock className="w-4 h-4" />{" "}
//                                                     Afternoon Shift
//                                                 </p>
//                                                 <div className="space-y-2 pl-6">
//                                                     <p className="text-sm">
//                                                         <span className="text-gray-600">
//                                                             In:
//                                                         </span>{" "}
//                                                         <span className="font-medium">
//                                                             {formatTime(
//                                                                 schedule.pm_time_in
//                                                             )}
//                                                         </span>
//                                                     </p>
//                                                     <p className="text-sm">
//                                                         <span className="text-gray-600">
//                                                             Out:
//                                                         </span>{" "}
//                                                         <span className="font-medium">
//                                                             {formatTime(
//                                                                 schedule.pm_time_out
//                                                             )}
//                                                         </span>
//                                                     </p>
//                                                     <p className="text-sm">
//                                                         <span className="text-gray-600">
//                                                             Grace Period:
//                                                         </span>{" "}
//                                                         <span className="font-medium">
//                                                             {
//                                                                 schedule.pm_grace_period_minutes
//                                                             }{" "}
//                                                             mins
//                                                         </span>
//                                                     </p>
//                                                     <p className="text-sm">
//                                                         <span className="text-gray-600">
//                                                             undertime grace:
//                                                         </span>{" "}
//                                                         <span className="font-medium">
//                                                             {
//                                                                 schedule.pm_undertime_grace_minutes
//                                                             }{" "}
//                                                             mins
//                                                         </span>
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="border-t pt-6">
//                                         <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                                             Requirements
//                                         </h3>

//                                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                                             <Requirement
//                                                 label="AM Photo"
//                                                 required={
//                                                     schedule.am_require_photo_in
//                                                 }
//                                                 color="blue"
//                                             />
//                                             <Requirement
//                                                 label="PM Photo"
//                                                 required={
//                                                     schedule.pm_require_photo_in
//                                                 }
//                                                 color="blue"
//                                             />
//                                             <Requirement
//                                                 label="AM Location"
//                                                 required={
//                                                     schedule.am_require_location_in
//                                                 }
//                                                 color="purple"
//                                             />
//                                             <Requirement
//                                                 label="PM Location"
//                                                 required={
//                                                     schedule.pm_require_location_in
//                                                 }
//                                                 color="purple"
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ) : (
//                             <div className="bg-white rounded-lg shadow-lg p-8 text-center">
//                                 <h2 className="text-2xl font-bold text-gray-900 mb-4">
//                                     No Schedule Found
//                                 </h2>
//                                 <p className="text-gray-600 mb-6">
//                                     You don’t have a work schedule yet. Create
//                                     one to get started.
//                                 </p>
//                                 <a
//                                     href="/agent/schedule/create"
//                                     className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
//                                 >
//                                     Create Schedule
//                                 </a>
//                             </div>
//                         )}
//                     </>
//                 )}
//             </div>
//         </div>
//     )
// }

// interface RequirementProps {
//     label: string
//     required: boolean | number
//     color: "blue" | "purple"
// }

// const Requirement = ({ label, required, color }: RequirementProps) => (
//     <div
//         className={`p-3 rounded-lg text-center ${
//             color === "blue" ? "bg-blue-50" : "bg-purple-50"
//         }`}
//     >
//         <p className="text-xs text-gray-600 mb-2">{label}</p>
//         <p
//             className={`font-semibold ${
//                 required
//                     ? color === "blue"
//                         ? "text-blue-600"
//                         : "text-purple-600"
//                     : "text-gray-400"
//             }`}
//         >
//             {required ? "✓ Required" : "✗ Not Required"}
//         </p>
//     </div>
// )

// export default AgentProfilePage

import { useUser } from "@/features/auth/hooks/useUser"
import { isAgent } from "@/features/auth/types/auth"
import CompanyTabs from "@/features/shared/components/CompanyTabs"

const AgentProfilePage = () => {
    const { data: user } = useUser()

    const companyId =
        user && isAgent(user.user) ? user.user.agent.company_id : ""

    return <CompanyTabs id={companyId} />
}

export default AgentProfilePage
