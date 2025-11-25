import { Outlet, useNavigate } from "react-router-dom"
import {
    // Home,
    User,
    // FileText,
    CalendarCheck,
    SaveIcon,
    // ClipboardList,
    // FolderOpen,
} from "lucide-react"
import { toast } from "sonner"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { useUser } from "@/features/auth/hooks/useUser"
import { useLogout } from "@/features/auth/hooks/useLogout"
import Sidebar from "./dashboard/Sidebar"
import DashboardLayout from "./dashboard/DashboardLayout"
import Navbar from "./dashboard/Navbar"

const studentLinks = [
    { name: "Profile", path: "/student/dashboard", icon: User },
    // { name: "Dashboard", path: "/student/dashboard", icon: Home },
    // { name: "Profile", path: "/student/profile", icon: User },
    { name: "Attendance", path: "/student/attendance", icon: CalendarCheck },
    { name: "Excuse", path: "/student/excuse", icon: CalendarCheck },
    // { name: "documents", path: "/student/documents", icon: SaveIcon },
    // { name: "Reports", path: "/student/reports", icon: FileText },
    // { name: "Documents", path: "/student/documents", icon: FolderOpen },
    // { name: "Evaluation", path: "/student/evaluation", icon: ClipboardList },
]

const StudentLayout = () => {
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
                            role: "Student",
                        }}
                    />
                }
                sidebar={<Sidebar links={studentLinks} title="Student" />}
            >
                <Outlet />
            </DashboardLayout>
        </SidebarProvider>
    )
}

export default StudentLayout
