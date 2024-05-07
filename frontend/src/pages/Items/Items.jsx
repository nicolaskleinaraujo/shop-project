// CSS
import styles from "./Items.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const Items = () => {
    const [items, setItems] = useState([])

    const getItems = async() => {
        const res = await dbFetch.get("/item/items")
        setItems(res.data)
    }

    useEffect(() => {
        getItems()
    }, [])

    return (
        <div>
            <h1>Items</h1>

            { items &&
                items.map((item) => (
                    <div key={item.id}>
                        <p>{item.name} | {item.value}</p>
                        <Link to={`/update/${item.id}`}>Atualizar</Link>
                        <button>Deletar</button>
                    </div>
                ))
            }
        </div>
    )
}

export default Items