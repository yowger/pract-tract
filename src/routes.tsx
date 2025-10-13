import { Navigate } from "react-router-dom"

import { ProtectedRoute } from "@/features/auth/components/routes/ProtectedRoutes"
import SelectRolePage from "@/pages/signUp/SelectRolePage"
import StudentFormPage from "@/pages/signUp/student/StudentFormPage"
import AgentFormPage from "@/pages/signUp/agent/AgentFormPage"
import AdvisorFormPage from "@/pages/signUp/advisor/AdvisorFormPage"
import LandingPage from "@/pages/LandingPage"
import StudentDashboardPage from "@/pages/student/StudentDashboardPage"
import SignInFormPage from "@/pages/signUp/SignInFormPage"
import DirectorDashboardPage from "@/pages/director/DirectorDashboardPage"
import StudentLayout from "@/layouts/StudentLayout"
import DirectorLayout from "@/layouts/DirectorLayout"
import { PublicRoute } from "@/features/auth/components/routes/PublicRoutes"

const routes = [
    { path: "/landing", element: <LandingPage /> },

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
                    // { path: "students", element: <StudentManagementPage /> },
                    // { path: "advisors", element: <AdvisorManagementPage /> },
                    // { path: "companies", element: <CompanyManagementPage /> },
                    // { path: "reports", element: <ReportsPage /> },
                ],
            },
        ],
    },

    { path: "*", element: <div>Not Found</div> },
]

export default routes
