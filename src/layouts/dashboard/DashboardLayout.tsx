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
        <div className="flex w-full min-h-screen">
            {sidebar}
            <div className="flex flex-col flex-1">
                {navbar}
                <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout
