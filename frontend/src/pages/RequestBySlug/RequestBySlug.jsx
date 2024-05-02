// CSS
import styles from "./RequestBySlug.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const RequestBySlug = () => {
    const { slug } = useParams()

    const [request, setRequest] = useState([])
    const [items, setItems] = useState([])
    
    const getRequest = async() => {
        const res = await dbFetch.get(`/request/slug/${slug}`)
        const itemsArray = res.data.items

        setRequest(res.data)
        setItems(itemsArray.split(", "))
    }

    useEffect(() => {
        getRequest()
    }, [])

    return (
        <div>
            <h1>Request By Slug</h1>
            {items &&
                items.map((item, index) => (
                    <p key={index}>{item}</p>
                ))
            }
        </div>
    )
}

export default RequestBySlug