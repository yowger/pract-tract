import { Outlet, useNavigate } from "react-router-dom"
import { Home, User, CalendarCheck, FolderOpen } from "lucide-react"
import { toast } from "sonner"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { useUser } from "@/features/auth/hooks/useUser"
import { useLogout } from "@/features/auth/hooks/useLogout"
import Sidebar from "./dashboard/Sidebar"
import DashboardLayout from "./dashboard/DashboardLayout"
import Navbar from "./dashboard/Navbar"

const AgentLinks = [
    { name: "Profile", path: "/agent/dashboard", icon: Home },
    // { name: "Dashboard", path: "/agent/dashboard", icon: Home },
    // { name: "Profile", path: "/agent/profile", icon: User },
    // { name: "Attendance", path: "/agent/attendance", icon: CalendarCheck },
    // { name: "Students", path: "/agent/students", icon: FolderOpen },
]

const AgentLayout = () => {
    const { data: user } = useUser()
    const { mutateAsync: logout } = useLogout()
    const navigate = useNavigate()

    if (!user) return null

    async function handleLogout() {
        try {
            await logout()
            toast.success("Logged out successfully")
            navigate("/signin")
        } catch (error) {
            toast.error("Failed to log out")
            console.error(error)
        }
    }

    return (
        <SidebarProvider>
            <DashboardLayout
                navbar={
                    <Navbar
                        toggleButton={<SidebarTrigger />}
                        onLogout={handleLogout}
                        user={{
                            name: user.user.name,
                            role: user.user.role,
                        }}
                    />
                }
                sidebar={<Sidebar links={AgentLinks} title="Student" />}
            >
                <Outlet />
            </DashboardLayout>
        </SidebarProvider>
    )
}

export default AgentLayout
