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
        <div className={styles.all_users}>
            <h1>Usuarios</h1>

            {users && (
                users.map((user) => (
                    <div key={user.id}>
                        <p>{user.fullName}</p>
                        <button>Deletar</button>
                        {!user.isAdmin && <button>Tornar Admin</button>}
                    </div>
                ))
            )}
        </div>
    )
}

export default AllUsers