// CSS
import styles from "./Items.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState, useEffect } from "react"

// Components
import Box from "../../components/Box/Box"

const Items = () => {
    const [loading, setLoading] = useState(true)
    const [update, setUpdate] = useState(false)
    const [items, setItems] = useState([])

    const getItems = async() => {
        const res = await dbFetch.get("/item/items")
        setItems(res.data)
        if (loading) { setLoading(false) }
        if (update) { setUpdate(false) }
    }

    const deleteItem = async(id) => {
        if (confirm("Deseja mesmo deletar este item?")) {
            setLoading(true)
            await dbFetch.delete(`/item/${id}`)
            setUpdate(true)
        }
    }

    useEffect(() => {
        getItems()
    }, [update === true])

    return (
        <div className={styles.items}>
            <h1>Items</h1>

            {loading ? (
                <img src="/loading.svg" alt="Carregando" />
            ) : (
                items.map((item) => (
                    <Box 
                        key={item.id}

                        name={item.name}
                        value={item.value}

                        linkText="Atualizar"
                        link={`/update-item/${item.id}`}

                        btnText="Deletar"
                        btnAction={() => deleteItem(item.id)}
                    />
                )))
            }
        </div>
    )
}

export default Items