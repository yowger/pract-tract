interface DashboardLayoutProps {
    sidebar: React.ReactNode
    navbar?: React.ReactNode
    children: React.ReactNode
}

const DashboardLayout = ({
    sidebar,
    navbar,
    children,
}: DashboardLayoutProps) => {
    return (
        <div className="flex w-full min-h-screen ">
            {sidebar}
            <div className="flex flex-col flex-1">
                {navbar}
                <main className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-slate-50 to-slate-100">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout
