// CSS
import styles from "./Footer.module.css"

const Footer = () => {
  return (
    <footer className={styles.footer}>
        <p>&copy; 2024 - Site desenvolvido por <a href="https://github.com/nicolaskleinaraujo" target="_blank">Nicolas Klein</a>.</p>
        <p>Favor, utilizar as features com moderação e consciência.</p>
    </footer>
  )
}

export default Footer