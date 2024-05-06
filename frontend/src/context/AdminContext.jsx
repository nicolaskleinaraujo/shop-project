// Modules
import { createContext, useState } from "react"

// Context
export const AdminContext = createContext()

// Provider
export const AdminProvider = ({ children }) => {
    const [admin, setAdmin] = useState(false)

    return (
        <AdminContext.Provider value={{ admin, setAdmin }}>
            {children}
        </AdminContext.Provider>
    )
}