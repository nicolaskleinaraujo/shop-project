// CSS
import styles from "./Cart.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState, useEffect } from "react"

const Cart = () => {
    const [cart, setCart] = useState("")
    const [items, setItems] = useState([])
    const [prices, setPrices] = useState([])

    const getItems = () => {
        setCart(localStorage.getItem("cart"))
        setItems(cart.split(", "))
    }

    const getPrice = async(itemName) => {
        await dbFetch()
    }

    useEffect(() => {
        getItems()
    }, [])

    return (
        <div>
            <h1>Cart</h1>
            <button onClick={() => console.log(items)}>teste</button>
            <button onClick={() => console.log(cart)}>teste2</button>
            <div>
                {items && (
                    items.map((item) => (
                        <div>{item} || {getPrice(item)}</div>
                    ))
                )}
            </div>
            
        </div>
    )
}

export default Cart
