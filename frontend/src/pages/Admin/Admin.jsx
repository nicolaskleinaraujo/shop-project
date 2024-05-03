// CSS
import styles from "./Admin.module.css"

// Modules
import { Link } from "react-router-dom"

const Admin = () => {
  return (
    <div className={styles.admin}>
        <h1>Página de Admin</h1>

        <Link to="/all-users">Ver Usuarios</Link>
        <Link to="/all-requests">Ver Pedidos</Link>
        <Link to="/create-item">Items</Link>
    </div>
  )
}

export default Admin