// CSS
import styles from "./Cart.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState, useEffect } from "react"

const Cart = () => {
  const [items, setItems] = useState([])
  const [values, setValues] = useState([])

  const getItems = async() => {
    const storedCart = localStorage.getItem("cart")
    const itemsId = storedCart.split(", ")

    const promises = itemsId.map(async(itemId) => {
      const res = await dbFetch.get(`/item/${itemId}`)
      return res.data
    })
    const results = await Promise.all(promises)

    const itemsArray = results.map((result) => result.name)
    const valuesArray = results.map((result) => result.value)

    setItems(itemsArray)
    setValues(valuesArray)
  }

  const removeItem = (index) => {
    const storedCart = localStorage.getItem("cart")
    const itemsId = storedCart.split(", ")
    itemsId.splice(index, 1)

    const newCart = itemsId.join(", ")
    localStorage.setItem("cart", newCart)
  }

  useEffect(() => {
    getItems()
  }, [])

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
          ))
        }
      </div>
    </div>
  )
}

export default Cart
