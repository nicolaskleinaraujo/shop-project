// Modules
import { useContext } from "react"
import { Outlet, Navigate } from "react-router-dom"

// Context
import { AdminContext } from "../context/AdminContext"

const AdminRoute = () => {
    const { admin } = useContext(AdminContext)

    return admin ? <Outlet /> : <Navigate to="/" />
}

export default AdminRoute
