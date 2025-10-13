import { Navigate } from "react-router-dom"

import { ProtectedRoute } from "@/features/auth/components/routes/ProtectedRoutes"
import SelectRolePage from "@/pages/signUp/SelectRolePage"
import StudentFormPage from "@/pages/signUp/student/StudentFormPage"
import AgentFormPage from "@/pages/signUp/agent/AgentFormPage"
import AdvisorFormPage from "@/pages/signUp/advisor/AdvisorFormPage"
import LandingPage from "@/pages/LandingPage"
import StudentDashboardPage from "@/pages/student/StudentDashboardPage"
import SignInFormPage from "./pages/signUp/SignInFormPage"

const routes = [
    { path: "/landing", element: <LandingPage /> },
    { path: "/signin", element: <SignInFormPage /> },
    { path: "/signup", element: <SelectRolePage /> },
    { path: "/signup/*", element: <Navigate to="/signup" replace /> },
    { path: "/signup/student", element: <StudentFormPage /> },
    { path: "/signup/agent", element: <AgentFormPage /> },
    { path: "/signup/advisor", element: <AdvisorFormPage /> },

    {
        path: "/student",
        element: <ProtectedRoute allowedRoles={["student"]} />,
        children: [
            { path: "dashboard", element: <StudentDashboardPage /> },
            // { path: "profile", element: <StudentProfilePage /> },
            // { path: "settings", element: <StudentSettingsPage /> },
        ],
    },

    { path: "*", element: <div>Not Found</div> },
]

export default routes
