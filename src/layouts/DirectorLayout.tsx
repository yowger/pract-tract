import { Outlet, useNavigate } from "react-router-dom"
import { Home, Users, Building2, UserCog, ListIcon } from "lucide-react"
import { toast } from "sonner"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { useUser } from "@/features/auth/hooks/useUser"
import { useLogout } from "@/features/auth/hooks/useLogout"
import Navbar from "./dashboard/Navbar"
import Sidebar from "./dashboard/Sidebar"
import DashboardLayout from "./dashboard/DashboardLayout"

const adminLinks = [
    { name: "Dashboard", path: "/director/dashboard", icon: Home },
    { name: "Students", path: "/director/students", icon: Users },
    { name: "Advisors", path: "/director/advisors", icon: UserCog },
    { name: "Companies", path: "/director/companies", icon: Building2 },
    { name: "Evaluation", path: "/director/evaluations", icon: ListIcon },
]

const DirectorLayout = () => {
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
                            role: "Program Coordinator",
                        }}
                    />
                }
                sidebar={<Sidebar links={adminLinks} title="PC" />}
            >
                <Outlet />
            </DashboardLayout>
        </SidebarProvider>
    )
}

export default DirectorLayout
