import { Outlet } from "react-router-dom"
import AdminSidebar from "../components/AdminSidebar"

export const AdminLayout = () => {
    return (
        <div className="flex h-screen bg-white">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto p-8">
                <Outlet />
            </main>
        </div>
    )
}

