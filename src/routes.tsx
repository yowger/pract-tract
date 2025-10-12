import { Navigate } from "react-router-dom"

import SelectRolePage from "@/pages/signUp/SelectRolePage"
import StudentFormPage from "@/pages/signUp/student/StudentFormPage"
import AgentFormPage from "@/pages/signUp/agent/AgentFormPage"
import AdvisorFormPage from "@/pages/signUp/advisor/AdvisorFormPage"
import LandingPage from "@/pages/landing/LandingPage"

const routes = [
    { path: "/", element: <LandingPage /> },
    { path: "/signup", element: <SelectRolePage /> },
    { path: "/signup/*", element: <Navigate to="/signup" replace /> },
    { path: "/signup/student", element: <StudentFormPage /> },
    { path: "/signup/agent", element: <AgentFormPage /> },
    { path: "/signup/advisor", element: <AdvisorFormPage /> },

    { path: "*", element: <div>Not Found</div> },
]

export default routes

/*
    { path: "/", element: <div>Home</div> },
    { path: "/about", element: <div>About</div> },
    {
        path: "/dashboard",
        element: <div>Dashboard Layout</div>,
        children: [
            { index: true, element: <div>Dashboard</div> },
            { path: "settings", element: <div>Settings </div> },
        ],
    },
    { path: "*", element: <div>Not Found</div> },
]
*/
