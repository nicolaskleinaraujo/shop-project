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

  useEffect(() => {
    getItems()
  }, [])

  return (
    <div>
      <h1>Cart</h1>

      {items &&
        items.map((item, index) => (
          <div key={index}>
            {item} | R$ {values[index]}
          </div>
        ))
      }
    </div>
  )
}

export default Cart
