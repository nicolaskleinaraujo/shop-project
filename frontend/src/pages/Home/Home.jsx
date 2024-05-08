// CSS
import styles from "./Home.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useContext, useEffect, useState } from "react"

// Context
import { SearchContext } from "../../context/SearchContext"

const Home = () => {
  const { search } = useContext(SearchContext)
  const [items, setItems] = useState([])
  const [searchValue, setSearchValue] = useState([])

  const getItems = async () => {
    const res = await dbFetch.get("/item/items")
    setItems(res.data)
  }

  const searchItems = (e) => {
    const value = items.filter((item) => item.name.toLowerCase().includes(e.toLowerCase()))
    setSearchValue(value)
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
      {search &&
        <div className={styles.home_search}>
          <input 
            type="text" 
            onChange={(e) => searchItems(e.target.value)} 
          />
        </div>
      }

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
