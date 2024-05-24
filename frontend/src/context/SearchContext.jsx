// Modules
import { createContext, useState } from "react"

// Context
export const SearchContext = createContext()

// Provider
export const SearchProvider = ({ children }) => {
    const [search, setSearch] = useState("")

    return (
        <SearchContext.Provider value={{ search, setSearch }}>
            {children}
        </SearchContext.Provider>
    )
}
