// CSS
import styles from "./AllUsers.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState, useEffect } from "react"

const AllUsers = () => {
    const [users, setUsers] = useState([])

    const getAllUsers = async() => {
        const res = await dbFetch.get("/user")
        setUsers(res.data)
    }

    useEffect(() => {
        getAllUsers()
    }, [])

    return (
        <div>
            <h1>All Users</h1>
        </div>
    )
}

export default AllUsers