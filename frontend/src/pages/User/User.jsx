// CSS
import styles from "./User.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

// Context
import { UserContext } from '../../context/UserContext'
import { AdminContext } from "../../context/AdminContext"

const User = () => {
    const { userId, setUserId } = useContext(UserContext)
    const { admin, setAdmin }= useContext(AdminContext)
    const navigate = useNavigate()

    const leaveAccount = async() => {
        try {
            const res = await dbFetch.post("/user/leave")
            setUserId(0)
            setAdmin(false)
            toast.success(res.data.msg)
            navigate("/login")
        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    const deleteAccount = async() => {
        if (confirm("Deseja deletar sua conta?")) {
            try {
                const res = await dbFetch.delete(`/user/${userId}`)
                setUserId(0)
                setAdmin(false)
                toast.success(res.data.msg)
                navigate("/register")
            } catch (err) {
                toast.error(err.response.data.msg)
            }
        }
    }

    return (
        <div className={styles.user}>
            <h1>Perfil</h1>
            <Link to="/requests">Pedidos</Link>
            { admin && <Link to="/admin">Página de Admin</Link> }
            <Link to="/infos">Atualizar Dados</Link>
            <button onClick={() => leaveAccount()}>Sair</button>
            <button onClick={() => deleteAccount()}>Deletar Conta</button>
        </div>
    )
}

export default User