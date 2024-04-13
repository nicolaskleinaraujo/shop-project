// CSS
import styles from "./Navbar.module.css"

// Modules
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.search}>PESQ</div>
            <div><Link to="/"><img src="https://via.placeholder.com/50x50" alt="Logo do Site" /></Link></div>
            <div className={styles.menu}>
                <Link to="/">CA</Link> 
                <Link to="/">US</Link>
            </div>
        </nav>
    )
}

export default Navbar