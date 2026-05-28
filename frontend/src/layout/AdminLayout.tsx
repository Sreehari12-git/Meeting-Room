import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"

 export const AdminLayout = () => {
    return (
        <>
            <Sidebar/>
            <Outlet/>
        </>
    )
}