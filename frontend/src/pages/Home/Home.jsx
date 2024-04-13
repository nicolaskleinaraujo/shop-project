// CSS
import styles from "./Home.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useEffect, useState } from "react"

const Home = () => {
    const [items, setItems] = useState([])

    const getItems = async() => {
        const res = await dbFetch.get("/item/items")
        setItems(res.data)
    }

    useEffect(() => {
        getItems()
    }, [])

    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}

export default Home