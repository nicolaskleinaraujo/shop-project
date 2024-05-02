// CSS
import styles from "./Navbar.module.css"

// Modules
import { useContext } from "react"
import { Link } from "react-router-dom"

// Context
import { UserContext } from "../../context/UserContext"

const Navbar = () => {
    const { userId } = useContext(UserContext)

    return (
        <nav className={styles.navbar}>
            <div className={styles.search}>PESQ</div>
            <div><Link to="/"><img src="https://via.placeholder.com/50x50" alt="Logo do Site" /></Link></div>
            <div className={styles.menu}>
                <Link to="/my-cart">CA</Link>

                {userId != 0 ? (
                    <Link to="/user">US</Link>
                ) : (
                    <Link to="/login">US</Link>
                )}
            </div>
        </nav>
    )
}

export default Navbar