import { Outlet } from "react-router-dom"

const StudentLayout = () => {
    return (
        <div className="flex h-screen">
            <aside className="bg-gray-100 p-4 border-r">Sidebar</aside>

            <main className="flex-1 overflow-y-auto p-6">
                <Outlet />
            </main>
        </div>
    )
}

export default StudentLayout
