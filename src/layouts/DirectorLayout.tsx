import { Outlet, useNavigate } from "react-router-dom"
import { Home, Users, Building2, UserCog } from "lucide-react"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Sidebar from "./dashboard/Sidebar"
import DashboardLayout from "./dashboard/DashboardLayout"
import Navbar from "./dashboard/Navbar"
import { useUser } from "@/features/auth/hooks/useUser"
import { isDirector } from "@/features/auth/api/authApi"

const adminLinks = [
    { name: "Dashboard", path: "/director/dashboard", icon: Home },
    { name: "Students", path: "/director/students", icon: Users },
    { name: "Advisors", path: "/director/advisors", icon: UserCog },
    { name: "Companies", path: "/director/companies", icon: Building2 },
]

const DirectorLayout = () => {
    const { data: user } = useUser()
    const navigate = useNavigate()

    if (!user) return null

    if (user && isDirector(user.user) === false) {
        navigate("/login")
        return null
    }

    return (
        <SidebarProvider>
            <DashboardLayout
                navbar={
                    <Navbar
                        toggleButton={<SidebarTrigger />}
                        user={{
                            name: user.user.name,
                            role: user.user.role,
                        }}
                    />
                }
                sidebar={<Sidebar links={adminLinks} title="Director" />}
            >
                <Outlet />
            </DashboardLayout>
        </SidebarProvider>
    )
}

export default DirectorLayout
