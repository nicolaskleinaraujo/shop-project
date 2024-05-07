// CSS
import styles from "./AllUsers.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState, useEffect } from "react"

const AllUsers = () => {
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState([])

    const getAllUsers = async() => {
        const res = await dbFetch.get("/user")
        setUsers(res.data)
        if (loading) {setLoading(false)}
    }

    useEffect(() => {
        getAllUsers()
    }, [loading])

    return (
        <div className={styles.all_users}>
            <h1>Usuarios</h1>

            {users && (
                users.map((user) => (
                    <div key={user.id}>
                        <p>{user.fullName}</p>

                        {!user.isAdmin ? (
                            <button>Tornar Admin</button>
                        ) : (
                            <button>Remover Admin</button>
                        )}
                    </div>
                ))
            )}
        </div>
    )
}

export default AllUsers