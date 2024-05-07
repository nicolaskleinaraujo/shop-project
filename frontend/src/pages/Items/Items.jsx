// CSS
import styles from "./Items.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const Items = () => {
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])

    const getItems = async() => {
        const res = await dbFetch.get("/item/items")
        setItems(res.data)
        if (loading) { setLoading(false) }
    }

    const deleteItem = async(id) => {
        if (confirm("Deseja mesmo deletar este item?")) {
            await dbFetch.delete(`/item/${id}`)
            setLoading(true)
        }
    }

    useEffect(() => {
        getItems()
    }, [loading])

    return (
        <div className={styles.items}>
            <h1>Items</h1>

            { items &&
                items.map((item) => (
                    <div key={item.id}>
                        <p>{item.name} | {item.value}</p>
                        <Link to={`/update/${item.id}`}>Atualizar</Link> |
                        <button onClick={() => deleteItem(item.id)}>Deletar</button>
                    </div>
                ))
            }
        </div>
    )
}

export default Items