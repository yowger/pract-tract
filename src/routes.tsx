import { lazy } from "react"
import { Navigate } from "react-router-dom"

import { ProtectedRoute } from "@/features/auth/components/routes/ProtectedRoutes"
import { PublicRoute } from "@/features/auth/components/routes/PublicRoutes"
import AgentLayout from "./layouts/AgentLayout"
import AgentDashboardPage from "./pages/agent/AgentDashboardPage"
import AgentStudentsPage from "./pages/agent/AgentStudentsPage"
import AgentAttendancePage from "./pages/agent/AgentAttendancePage"
import AgentProfilePage from "./pages/agent/AgentProfilePage"
import AgentCreateSchedulePage from "./pages/agent/AgentCreateSchedule"
import DirectorCompanyProfilePage from "./pages/director/DirectorCompanyProfilePage"
import DirectorStudentProfilePage from "./pages/director/DirectorStudentProfilePage"
import DirectorAdvisorProfilePage from "./pages/director/DirectorAdvisorProfilePage"
import AdminLayout from "./layouts/AdminLayout"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AgentCreatePage from "./pages/admin/AgentCreatePage"
import AdvisorCreatePage from "./pages/admin/AdvisorCreatePage"
import AdvisorLayout from "./layouts/AdvisorLayout"
import AdvisorProfilePage from "./pages/advisor/AdvisorProfilePage"
import ExcusePage from "./pages/student/ExcusePage"
import { ExcuseCreatePage } from "./pages/student/ExcuseCreatePage"
import DirectorEvaluationsPage from "./pages/director/DirectorEvaluationsPage"
import DirectorCreateEvaluationsPage from "./pages/director/DirectorCreateEvaluationsPage"
import DocumentsUploadsPage from "./pages/student/DocumentsUploadsPage"
import AgentUpdateSchedulePage from "./pages/agent/AgentUpdateSchedulePage"

const LandingPage = lazy(() => import("@/pages/LandingPage"))
const SignInFormPage = lazy(() => import("@/pages/signUp/SignInFormPage"))
const SelectRolePage = lazy(() => import("@/pages/signUp/SelectRolePage"))
const StudentFormPage = lazy(
    () => import("@/pages/signUp/student/StudentFormPage")
)
const AgentFormPage = lazy(() => import("@/pages/signUp/agent/AgentFormPage"))
const AdvisorFormPage = lazy(
    () => import("@/pages/signUp/advisor/AdvisorFormPage")
)

const StudentLayout = lazy(() => import("@/layouts/StudentLayout"))
const DirectorLayout = lazy(() => import("@/layouts/DirectorLayout"))

const StudentDashboardPage = lazy(
    () => import("@/pages/student/StudentDashboardPage")
)
const StudentProfilePage = lazy(
    () => import("@/pages/student/StudentProfilePage")
)
const StudentAttendancePage = lazy(
    () => import("@/pages/student/StudentAttendancePage")
)
const StudentReportsPage = lazy(
    () => import("@/pages/student/StudentReportsPage")
)
const DocumentsPage = lazy(() => import("@/pages/student/DocumentsPage"))
const StudentEvaluationPage = lazy(
    () => import("@/pages/student/StudentEvaluationPage")
)

const DirectorDashboardPage = lazy(
    () => import("@/pages/director/DirectorDashboardPage")
)
const StudentManagementPage = lazy(
    () => import("@/pages/director/StudentManagementPage")
)
const AdvisorManagementPage = lazy(
    () => import("@/pages/director/AdvisorManagementPage")
)
const CompanyManagementPage = lazy(
    () => import("@/pages/director/CompanyManagementPage")
)

const routes = [
    { path: "/landing", element: <LandingPage /> },
    { path: "/", element: <Navigate to="/landing" replace /> },

    {
        element: <PublicRoute />,
        children: [
            { path: "/signin", element: <SignInFormPage /> },
            { path: "/signup", element: <SelectRolePage /> },
            { path: "/signup/*", element: <Navigate to="/signup" replace /> },
            { path: "/signup/student", element: <StudentFormPage /> },
            { path: "/signup/agent", element: <AgentFormPage /> },
            { path: "/signup/advisor", element: <AdvisorFormPage /> },
        ],
    },

    {
        path: "/agent",
        element: <ProtectedRoute allowedRoles={["agent"]} />,
        children: [
            {
                element: <AgentLayout />,
                children: [
                    // { path: "dashboard", element: <AgentDashboardPage /> },
                    // { path: "students", element: <AgentStudentsPage /> },
                    // { path: "attendance", element: <AgentAttendancePage /> },
                    {
                        path: "schedule/create",
                        element: <AgentCreateSchedulePage />,
                    },
                    {
                        path: "schedule/:id/edit",
                        element: <AgentUpdateSchedulePage />,
                    },
                    { path: "dashboard", element: <AgentProfilePage /> },
                ],
            },
        ],
    },

    {
        path: "/student",
        element: <ProtectedRoute allowedRoles={["student"]} />,
        children: [
            {
                element: <StudentLayout />,
                children: [
                    // { path: "dashboard", element: <StudentDashboardPage /> },
                    { path: "dashboard", element: <StudentProfilePage /> },
                    // { path: "profile", element: <StudentProfilePage /> },
                    { path: "attendance", element: <StudentAttendancePage /> },
                    { path: "excuse", element: <ExcusePage /> },
                    { path: "excuse/create", element: <ExcuseCreatePage /> },
                    { path: "documents", element: <DocumentsPage /> },
                    {
                        path: "documents/create",
                        element: <DocumentsUploadsPage />,
                    },
                    // { path: "reports", element: <StudentReportsPage /> },
                    // { path: "documents", element: <DocumentsPage /> },
                    // { path: "evaluation", element: <StudentEvaluationPage /> },
                ],
            },
        ],
    },

    {
        path: "/advisor",
        element: <ProtectedRoute allowedRoles={["advisor"]} />,
        children: [
            {
                element: <AdvisorLayout />,
                children: [
                    // { path: "dashboard", element: <StudentDashboardPage /> },
                    { path: "dashboard", element: <AdvisorProfilePage /> },
                    // { path: "profile", element: <StudentProfilePage /> },
                    // { path: "attendance", element: <StudentAttendancePage /> },
                    // { path: "reports", element: <StudentReportsPage /> },
                    // { path: "documents", element: <DocumentsPage /> },
                    // { path: "evaluation", element: <StudentEvaluationPage /> },
                ],
            },
        ],
    },

    {
        path: "/director",
        element: <ProtectedRoute allowedRoles={["director"]} />,
        children: [
            {
                element: <DirectorLayout />,
                children: [
                    { path: "dashboard", element: <DirectorDashboardPage /> },
                    { path: "students", element: <StudentManagementPage /> },
                    { path: "advisors", element: <AdvisorManagementPage /> },
                    { path: "companies", element: <CompanyManagementPage /> },
                    {
                        path: "companies/:id",
                        element: <DirectorCompanyProfilePage />,
                    },
                    {
                        path: "students/:id",
                        element: <DirectorStudentProfilePage />,
                    },
                    {
                        path: "advisors/:id",
                        element: <DirectorAdvisorProfilePage />,
                    },
                    {
                        path: "evaluations",
                        element: <DirectorEvaluationsPage />,
                    },
                    {
                        path: "evaluations/create",
                        element: <DirectorCreateEvaluationsPage />,
                    },

                    // { path: "reports", element: <ReportsPage /> },
                ],
            },
        ],
    },

    {
        path: "/admin",
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: [
            {
                element: <AdminLayout />,
                children: [
                    { path: "dashboard", element: <AdminDashboard /> },
                    { path: "agents", element: <AgentCreatePage /> },
                    { path: "advisors", element: <AdvisorCreatePage /> },
                ],
            },
        ],
    },

    { path: "*", element: <div>Not Found</div> },
]

export default routes
