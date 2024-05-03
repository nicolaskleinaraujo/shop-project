// CSS
import styles from "./Admin.module.css"

// Modules
import { Link } from "react-router-dom"

const Admin = () => {
  return (
    <div>
        <h1>Admin</h1>

        <Link to="/all-users">Ver Usuarios</Link>
        <Link to="/all-requests">Ver Pedidos</Link>
        <Link to="/create-item">Items</Link>
    </div>
  )
}

export default Admin