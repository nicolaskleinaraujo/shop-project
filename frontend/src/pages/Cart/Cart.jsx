// CSS
import styles from "./Cart.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

// Context
import { UserContext } from "../../context/UserContext"

const Cart = () => {
  const { userId } = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const [update, setUpdate] = useState(false)
  const navigate = useNavigate()

  const [items, setItems] = useState([])
  const [details, setDetails] = useState("")
  const [totalValue, setTotalValue] = useState()

  const getItems = async () => {
    const storedCart = localStorage.getItem("cart")

    if (storedCart === null || storedCart.length === 0) {
      setItems([])
      setLoading(false)
      return
    }

    const itemsId = storedCart.split(", ")

    const promises = itemsId.map(async (itemId) => {
      const res = await dbFetch.get(`/item/${itemId}`)
      return res.data
    })
    const results = await Promise.all(promises)

    const itemsArray = results.map((result) => result.name)
    const valuesArray = results.map((result) => result.value)
    const valueCalc = valuesArray.reduce((accumulator, current) => accumulator + current, 0)

    setItems(itemsArray)
    setTotalValue(valueCalc)

    if (loading) { setLoading(false) }
    if (update) { setUpdate(false) }
  }

  const removeItem = (index) => {
    setLoading(true)

    const storedCart = localStorage.getItem("cart")
    const itemsId = storedCart.split(", ")
    itemsId.splice(index, 1)

    const newCart = itemsId.join(", ")
    localStorage.setItem("cart", newCart)

    setUpdate(true)
  }

  const createRequest = async() => {
    const requestItems = items.join(", ")

    try {
      const res = await dbFetch.post("/request/create", {
        id: userId,
        items: requestItems,
        details,
        value: totalValue,
      })

      localStorage.removeItem("cart")
      setItems("")
      setDetails("")

      toast.success(res.data.msg)
      navigate("/requests")
    } catch (err) {
      toast.error(err.response.data.msg)
    }
  }

  useEffect(() => {
    getItems()
  }, [update === true])

  return (
    <div className={styles.cart}>
      <h1>Seu carrinho</h1>

      {loading ? (
        <img src="./loading.svg" alt="Carregando" />
      ) : (
        items.length === 0 ? (
          <>
            <p>Seu carrinho esta vazio.</p>
            <p>Adicione items para efetuar um pedido!</p>
          </>
        ) : (
          <>
            <div className={styles.cart_items}>
              {items.map((item, index) => (
                <div key={index}>
                  <p>{item} | </p>
                  <button onClick={() => removeItem(index)}>Remover</button>
                </div>
              ))}

              <p>Total: <span className={styles.cart_value}>R$ {totalValue.toFixed(2)}</span></p>
            </div>

            <div className={styles.cart_request}>
              <textarea 
                cols="20" 
                rows="4" 
                placeholder="Observações..." 
                onChange={(e) => setDetails(e.target.value)} 
                value={details}
              ></textarea>

              <button onClick={() => createRequest()}>Efetuar Pedido</button>
            </div>
          </>
        ))
      }
    </div>
  )
}

export default Cart
