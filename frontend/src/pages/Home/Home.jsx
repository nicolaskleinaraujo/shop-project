// CSS
import styles from "./Home.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"

// Context
import { UserContext } from "../../context/UserContext"
import { SearchContext } from "../../context/SearchContext"

const Home = () => {
  const [items, setItems] = useState([])
  const { search } = useContext(SearchContext)
  const [searchResults, setSearchResults] = useState([])
  const { userId } = useContext(UserContext)

  const getItems = async () => {
    setSearchResults([])
    const res = await dbFetch.get("/item/items")
    setItems(res.data)
  }

  const searchItems = (e) => {
    const res = items.filter((item) => item.name.toLowerCase().includes(e.toLowerCase()))
    setSearchResults(res)
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
  }, [search])

  return (
    <div className={styles.home}>
      {search &&
        <div className={styles.home_search}>
          <input 
            type="text" 
            placeholder="Pesquise por produtos" 
            onChange={(e) => searchItems(e.target.value)} 
          />
        </div>
      }

      {userId === 0 &&
        <div className={styles.home_welcome}>
          <h1>Loja de Doces</h1>
          <p>Bem vindo a minha loja de doces. Para testar todas as features do projeto, primeiramente crie uma conta!</p>
          <Link to="/register">Criar conta</Link>
        </div>
      }

      {items &&
        searchResults.length === 0 ? (

          items.map((item) => (
            <div key={item.id} className={styles.home_items}>
              <p className={styles.home_name}>{item.name}</p>
              <p className={styles.home_value}>R$ {item.value}</p>
              <p className={styles.home_description}>{item.description}</p>
              <button onClick={() => addToCart(item.id)}>Adicionar ao carrinho</button>
            </div>
          ))

        ) : (

          searchResults.map((item) => (
            <div key={item.id} className={styles.home_items}>
              <p className={styles.home_name}>{item.name}</p>
              <p className={styles.home_value}>R$ {item.value}</p>
              <p className={styles.home_description}>{item.description}</p>
              <button onClick={() => addToCart(item.id)}>Adicionar ao carrinho</button>
            </div>
          ))

        )
      }
    </div>
  )
}

export default Home
