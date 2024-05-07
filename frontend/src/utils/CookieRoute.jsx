// Modules
import { useContext } from "react"
import { Outlet, Navigate } from "react-router-dom"

// Context
import { UserContext } from "../context/UserContext"

const AdminRoute = () => {
    const { userId } = useContext(UserContext)

    return userId != 0 ? <Outlet /> : <Navigate to="/" />
}

export default AdminRoute
