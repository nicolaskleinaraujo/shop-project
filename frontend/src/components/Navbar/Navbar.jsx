// CSS
import styles from "./Navbar.module.css"

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.search}>PESQ</div>
            <div><img src="https://via.placeholder.com/50x50" alt="Logo do Site" /></div>
            <div className={styles.menu}>MENU</div>
        </nav>
    )
}

export default Navbar