import { NavLink } from "react-router-dom"
import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
    Sidebar,
    SidebarContent,
    SidebarMenu,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

interface SidebarProps {
    links: { name: string; path: string; icon: React.ElementType }[]
    title?: string
}

export const AppSidebar = ({ links, title = "MyApp" }: SidebarProps) => {
    return (
        <Sidebar>
            <SidebarContent>
                <div className="px-4 py-5 text-xl font-bold">{title}</div>

                <ScrollArea className="flex-1 px-2 pb-4">
                    <SidebarMenu>
                        {links.map(({ name, path, icon: Icon }) => (
                            <SidebarMenuItem key={path}>
                                <NavLink
                                    to={path}
                                    className={({ isActive }) =>
                                        cn(
                                            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium",
                                            isActive
                                                ? "bg-accent text-accent-foreground"
                                                : "hover:bg-muted hover:text-foreground"
                                        )
                                    }
                                >
                                    <Icon className="h-5 w-5" />
                                    {name}
                                </NavLink>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                    <ScrollBar orientation="vertical" className="w-2" />
                </ScrollArea>
            </SidebarContent>
        </Sidebar>
    )
}

export default AppSidebar
