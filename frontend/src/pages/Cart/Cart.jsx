// CSS
import styles from "./Cart.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState, useEffect, useContext } from "react"

// Context
import { UserContext } from "../../context/UserContext"

const Cart = () => {
  const { userId } = useContext(UserContext)

  const [items, setItems] = useState([])
  const [values, setValues] = useState([])
  const [details, setDetails] = useState("")
  const [loading, setLoading] = useState(true)

  const getItems = async () => {
    const storedCart = localStorage.getItem("cart")

    if (storedCart.length === 0) {
      setItems([])
      setValues([])
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

    setItems(itemsArray)
    setValues(valuesArray)
    if (loading) { setLoading(false) }
  }

  const removeItem = (index) => {
    const storedCart = localStorage.getItem("cart")
    const itemsId = storedCart.split(", ")
    itemsId.splice(index, 1)

    const newCart = itemsId.join(", ")
    localStorage.setItem("cart", newCart)

    setLoading(true)
  }

  const createRequest = async() => {
    const requestItems = items.join(", ")

    try {
      await dbFetch.post("/request/create", {
        id: userId,
        items: requestItems,
      })

      localStorage.removeItem("cart")
      setItems("")
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getItems()
  }, [loading])

  return (
    <div className={styles.cart}>
      <h1>Seu carrinho</h1>

      <div className={styles.cart_items}>
        {items &&
          items.map((item, index) => (
            <div key={index}>
              <p>{item} | </p>
              <p className={styles.cart_value}>R$ {values[index]} | </p>
              <button onClick={() => removeItem(index)}>Remover</button>
            </div>
        ))}

        <textarea 
          cols="30" 
          rows="10" 
          onChange={(e) => setDetails(e.target.value)} 
          value={details}
        ></textarea>

        <button onClick={() => createRequest()}>Efetuar Pedido</button>
      </div>
    </div>
  )
}

export default Cart
