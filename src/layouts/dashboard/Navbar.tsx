"use client"

import { Menu, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavbarProps {
    title?: string
    user?: {
        name: string
        role?: string
    }
    onToggleSidebar?: () => void
    onLogout?: () => void
    toggleButton?: React.ReactNode
}

export const Navbar = ({
    title = "Dashboard",
    user,
    onToggleSidebar,
    onLogout,
    toggleButton,
}: NavbarProps) => {
    return (
        <header className="flex items-center justify-between px-4 py-3 bg-background border-b sticky top-0">
            <div className="flex items-center gap-3">
                {toggleButton ?? (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onToggleSidebar}
                        className="lg:hidden"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                )}

                <h1 className="text-lg font-semibold">{title}</h1>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="flex items-center gap-2 px-3 py-1.5"
                    >
                        <User className="h-4 w-4" />
                        <span className="hidden sm:block text-sm font-medium">
                            {user?.name || "Guest"}
                        </span>
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-44">
                    <DropdownMenuLabel>
                        {user?.role ? user.role.toUpperCase() : "USER"}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={onLogout}
                        className="cursor-pointer"
                    >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    )
}

export default Navbar
