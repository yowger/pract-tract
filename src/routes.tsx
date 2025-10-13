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

const routes = [
    { path: "/", element: <Navigate to="/landing" replace /> },
    { path: "/landing", element: <LandingPage /> },
    { path: "/signin", element: <SignInFormPage /> },
    { path: "/signup", element: <SelectRolePage /> },
    { path: "/signup/*", element: <Navigate to="/signup" replace /> },
    { path: "/signup/student", element: <StudentFormPage /> },
    { path: "/signup/agent", element: <AgentFormPage /> },
    { path: "/signup/advisor", element: <AdvisorFormPage /> },

    {
        path: "/student",
        element: (
            <ProtectedRoute allowedRoles={["student"]}>
                <StudentLayout />
            </ProtectedRoute>
        ),
        children: [{ path: "dashboard", element: <StudentDashboardPage /> }],
    },

    {
        path: "/director",
        element: (
            <ProtectedRoute allowedRoles={["director"]}>
                <DirectorLayout />
            </ProtectedRoute>
        ),
        children: [{ path: "dashboard", element: <DirectorDashboardPage /> }],
    },

    { path: "*", element: <div>Not Found</div> },
]

export default routes
