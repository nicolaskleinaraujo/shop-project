// Modules
import dbFetch from "../axios/config"
import { useEffect, useContext, useState } from "react"
import { Outlet, Navigate } from "react-router-dom"

// Context
import { UserContext } from "../context/UserContext"

const AdminRoute = () => {
    const { userId } = useContext(UserContext)
    const [auth, setAuth] = useState(false)

    const isAdmin = async() => {
        const res = await dbFetch.get(`/user/${userId}`)
        if (res.data.isAdmin) {
            setAuth(true)
        }
    }

    useEffect(() => {
        isAdmin()
    }, [])

    return auth ? <Outlet /> : <Navigate to="/" />
}