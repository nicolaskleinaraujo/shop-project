// CSS
import styles from "./Home.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useEffect, useState } from "react"

const Home = () => {
  const [items, setItems] = useState([])

  const getItems = async () => {
    const res = await dbFetch.get("/item/items")
    setItems(res.data)
  }

  const addToCart = (productId) => {
    const cart = localStorage.getItem("cart")
    if (!cart) {
      localStorage.setItem("cart", productId)
    } else if (cart) {
      localStorage.setItem("cart", `${cart}, ${productId}`)
    }
  }

  useEffect(() => {
    getItems()
  }, [])

  return (
    <div className={styles.home}>
      {items &&
        items.map((item) => (
          <div key={item.id}>
            <p className={styles.home_name}>{item.name}</p>
            <p className={styles.home_value}>R$ {item.value}</p>
            <p className={styles.home_description}>{item.description}</p>
            <button onClick={() => addToCart(item.id)}>Adicionar ao carrinho</button>
          </div>
        ))}
    </div>
  )
}

export default Home
