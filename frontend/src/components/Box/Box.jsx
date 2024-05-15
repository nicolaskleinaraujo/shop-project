// CSS
import styles from "./Box.module.css"

// Modules
import { Link } from "react-router-dom"

const Box = ({ props }) => {
  return (
    <div className={styles.box}>
        {props.title && <p>{props.title}</p>}

        {props.price && <p>{props.price}</p>}

        {props.description && <p>{props.description}</p>}

        {props.btnAction && <button onClick={btnAction}>{props.btnText}</button>}

        {props.link && <Link to={props.link}>{props.linkText}</Link>}
    </div>
  )
}

export default Box
