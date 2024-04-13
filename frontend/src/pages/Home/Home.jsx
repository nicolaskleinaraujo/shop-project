// CSS
import styles from "./Home.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useEffect, useState } from "react"

const Home = () => {
    const [items, setItems] = useState([])

    const getItems = async() => {
        const res = await dbFetch.get("/item/items")
        setItems(res.data)
    }

    const addToCart = (productName) => {
        const cart = localStorage.getItem("cart")
        if (!cart) {
            localStorage.setItem("cart", productName)
        } else if (cart) {
            localStorage.setItem("cart", `${cart}, ${productName}`)
        }
    }

    useEffect(() => {
        getItems()
    }, [])

    return (
        <div className={styles.home}>
            {items && (
                items.map((item) => (
                    <div key={item.id}>
                        <p className={styles.name}>{item.name}</p>
                        <p className={styles.value}>R$ {item.value}</p>
                        <p className={styles.description}>{item.description}</p>
                        <button onClick={() => addToCart(item.name)}>Adicionar ao carrinho</button>
                    </div>
                ))
            )}
        </div>
    )
}

export default Home