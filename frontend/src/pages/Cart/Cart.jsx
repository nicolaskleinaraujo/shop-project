// CSS
import styles from "./Cart.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState, useEffect } from "react"

const Cart = () => {
    const [items, setItems] = useState([])
    const [values, setValues] = useState([])

    const getItems = () => {
        const storedCart = localStorage.getItem("cart")
        const itemsId = storedCart.split(", ")

        const itemsArray = []
        const valuesArray = []

        if (itemsId) {
            itemsId.forEach(async(itemId) => {
                const res = await dbFetch.get(`/item/${itemId}`)
                itemsArray.push(res.data.name)
                valuesArray.push(res.data.value)
            })
        }

        setItems(itemsArray)
        setValues(valuesArray)
    }

    useEffect(() => {
        getItems()
        console.log("testeuseeffect")
    }, [])

    return (
        <div>
            <h1>Cart</h1>
            <button onClick={() => console.log(items)}>teste</button>
            <button onClick={() => console.log(values)}>teste2</button>
            <div>
                {items && items.map((item, index) => {
                    <div key={index}>
                        {item} | {values[index]}
                    </div>
                })}
            </div>
        </div>
    )
}

export default Cart
