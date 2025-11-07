import { Outlet, useNavigate } from "react-router-dom"
import { Home, User } from "lucide-react"
import { toast } from "sonner"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { useUser } from "@/features/auth/hooks/useUser"
import { useLogout } from "@/features/auth/hooks/useLogout"
import Navbar from "./dashboard/Navbar"
import Sidebar from "./dashboard/Sidebar"
import DashboardLayout from "./dashboard/DashboardLayout"

const adminLinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: Home },
    { name: "Agents", path: "/admin/agents", icon: User },
]

const AdminLayout = () => {
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
                sidebar={<Sidebar links={adminLinks} title="Admin" />}
            >
                <Outlet />
            </DashboardLayout>
        </SidebarProvider>
    )
}

export default AdminLayout
