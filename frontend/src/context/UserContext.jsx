// Modules
import { createContext, useState } from "react"

// Context
export const UserContext = createContext()

// Provider
export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(0)

    return (
        <UserContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserContext.Provider>
    )
}
