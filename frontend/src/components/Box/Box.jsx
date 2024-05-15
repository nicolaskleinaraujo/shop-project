// CSS
import styles from "./Box.module.css"

// Modules
import { Link } from "react-router-dom"

const Box = (props) => {
    return (
        <div className={styles.box}>
            {props.title && <p className={styles.box_title}>{props.title}</p>}

            {props.value && <p className={styles.box_value}>{props.value}</p>}

            {props.desc && <p className={styles.box_desc}>{props.desc}</p>}

            {props.btnText && <button onClick={() => btnAction} className={styles.box_btn}>{props.btnText}</button>}

            {props.link && <Link to={props.link} className={styles.box_link}>{props.linkText}</Link>}
        </div>
    )
}

export default Box
