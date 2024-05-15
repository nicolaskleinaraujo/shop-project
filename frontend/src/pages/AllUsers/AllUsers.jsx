// CSS
import styles from "./AllUsers.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState, useEffect } from "react"

// Components
import Box from "../../components/Box/Box"

const AllUsers = () => {
    const [loading, setLoading] = useState(true)
    const [update, setUpdate] = useState(false)
    const [users, setUsers] = useState([])

    const getAllUsers = async() => {
        const res = await dbFetch.get("/user")
        setUsers(res.data)
        if (loading) { setLoading(false) }
        if (update) { setUpdate(false) }
    }

    const changeAdmin = async(id, state) => {
        if (confirm("Deseja mudar o admin deste usuario?")) {
            setLoading(true)
            await dbFetch.post("/user/admin/change", {
                id,
                isAdmin: state,
            })
            setUpdate(true)
        }
    }

    useEffect(() => {
        getAllUsers()
    }, [update === true])

    return (
        <div className={styles.all_users}>
            <h1>Usuarios</h1>

            {loading ? (
                <img src="/loading.svg" alt="Carregando" />
            ) : (
                users.map((user) => (
                    <Box 
                        key={user.id}
                        name={user.fullName}
                        btnText={!user.isAdmin ? "Tornar Admin" : "Remover Admin"}
                        btnAction={!user.isAdmin ? () => changeAdmin(user.id, true) : () => changeAdmin(user.id, false)}
                    />
                ))
            )}
        </div>
    )
}

export default AllUsers