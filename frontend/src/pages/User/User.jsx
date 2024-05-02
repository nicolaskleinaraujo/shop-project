// CSS
import styles from "./User.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"

// Context
import { UserContext } from '../../context/UserContext'

const User = () => {
    const { userId } = useContext(UserContext)
    const [admin, setAdmin] = useState(false)

    const isAdmin = async() => {
        const res = await dbFetch.get(`/user/${userId}`)
        setAdmin(res.data.isAdmin)
    }

    useEffect(() => {
        isAdmin()
    }, [])

    return (
        <div>
            <h1>Perfil</h1>
            <Link to="/requests">Pedidos</Link>
            <Link to="/infos">Mudar Informações</Link>
            { admin && <Link to="/admin">Página de Admin</Link> }
        </div>
    )
}

export default User