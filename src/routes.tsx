import { lazy } from "react"
import { Navigate } from "react-router-dom"

import { ProtectedRoute } from "@/features/auth/components/routes/ProtectedRoutes"
import { PublicRoute } from "@/features/auth/components/routes/PublicRoutes"

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
        path: "/student",
        element: <ProtectedRoute allowedRoles={["student"]} />,
        children: [
            {
                element: <StudentLayout />,
                children: [
                    { path: "dashboard", element: <StudentDashboardPage /> },
                    { path: "profile", element: <StudentProfilePage /> },
                    { path: "attendance", element: <StudentAttendancePage /> },
                    { path: "reports", element: <StudentReportsPage /> },
                    { path: "documents", element: <DocumentsPage /> },
                    { path: "evaluation", element: <StudentEvaluationPage /> },
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
                    // { path: "reports", element: <ReportsPage /> },
                ],
            },
        ],
    },

    { path: "*", element: <div>Not Found</div> },
]

export default routes
