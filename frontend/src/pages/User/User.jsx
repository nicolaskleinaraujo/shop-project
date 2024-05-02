// CSS
import styles from "./User.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useEffect, useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"

// Context
import { UserContext } from '../../context/UserContext'

const User = () => {
    const { userId } = useContext(UserContext)
    const navigate = useNavigate()
    const [admin, setAdmin] = useState(false)

    const isAdmin = async() => {
        const res = await dbFetch.get(`/user/${userId}`)
        setAdmin(res.data.isAdmin)
    }

    const deleteAccount = async() => {
        try {
            await dbFetch.delete(`/user/${userId}`)
            navigate("/register")
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        isAdmin()
    }, [])

    return (
        <div className={styles.user}>
            <h1>Perfil</h1>
            <Link to="/requests">Pedidos</Link>
            { admin && <Link to="/admin">Página de Admin</Link> }
            <Link to="/infos">Atualizar Dados</Link>
            <button onClick={() => deleteAccount()}>Deletar Conta</button>
        </div>
    )
}

export default User