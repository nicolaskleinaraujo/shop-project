// CSS
import styles from "./AllUsers.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

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

            {users && (
                users.map((user) => (
                    <div>
                        <p>{user.fullName}</p>
                        <button>Deletar</button>
                    </div>
                ))
            )}
        </div>
    )
}

export default AllUsers