// CSS
import styles from "./UpdateItem.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const UpdateItem = () => {
    const { id } = useParams()
    const [item, setItem] = useState([])

    const getItem = async() => {
        const res = await dbFetch.get(`/item/${id}`)
        setItem(res.data)
    }

    useEffect(() => {
        getItem()
    }, [])

    return (
        <div>
            <h1>Update Item</h1>
        </div>
    )
}

export default UpdateItem