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
        setRequest(res.data)
        setItems(res.data.items.split(", "))
    }

    useEffect(() => {
        getRequest()
    }, [])

    return (
        <div>
            <h1>Pedido {request.id}</h1>

            {items &&
                items.map((item, index) => (
                    <p key={index}>{item}</p>
                ))
            }

            <p>{request.value}</p>

            { request.details && <p>{request.details}</p> }
        </div>
    )
}

export default RequestBySlug