// CSS
import styles from "./Home.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"

// Components
import Box from "../../components/Box/Box"

// Context
import { UserContext } from "../../context/UserContext"
import { SearchContext } from "../../context/SearchContext"

const Home = () => {
  const [items, setItems] = useState([])
  
  const { search } = useContext(SearchContext)
  const [searchValue, setSearchValue] = useState("")
  const [searchResults, setSearchResults] = useState([])

  const { userId } = useContext(UserContext)
  const [loading, setLoading] = useState(true)

  const getItems = async () => {
    setSearchResults([])
    const res = await dbFetch.get("/item/items")
    setItems(res.data)
    if (loading) { setLoading(false) }
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

    toast.success("Item adicionado ao carrinho", { autoClose: 500 })
  }

  useEffect(() => {
    getItems()
  }, [searchValue == ""])

  return (
    <div className={styles.home}>
      {search &&
        <div className={styles.home_search}>
          <input 
            type="text" 
            placeholder="Pesquise por produtos" 
            onChange={(e) => { setSearchValue(e.target.value), searchItems(searchValue) }} 
            value={searchValue} 
          />
        </div>
      }

      {!loading && userId === 0 &&
        <Box 
          title="Loja de Doces"
          desc="Bem vindo a minha loja de doces. Para testar todas as features do projeto, primeiramente crie uma conta!"
          linkText="Criar conta"
          link="/register"
        />
      }

      {loading ? (
        <img src="./loading.svg" alt="Carregando" />
      ) : (
        searchResults.length === 0 ? (

          items.map((item) => (
            <Box
              key={item.id}
              name={item.name}
              value={item.value}
              desc={item.description}
              btnText="Adicionar ao carrinho"
              btnAction={() => addToCart(item.id)}
            />
          ))

        ) : (

          searchResults.map((item) => (
            <Box
              key={item.id}
              name={item.name}
              value={item.value}
              desc={item.description}
              btnText="Adicionar ao carrinho"
              btnAction={() => addToCart(item.id)}
            />
          ))

        ))
      }
    </div>
  )
}

export default Home
