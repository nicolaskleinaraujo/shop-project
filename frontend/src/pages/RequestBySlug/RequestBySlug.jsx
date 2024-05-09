// CSS
import styles from "./RequestBySlug.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const RequestBySlug = () => {
    const { slug } = useParams()
    const [loading, setLoading] = useState(true)

    const [request, setRequest] = useState([])
    const [items, setItems] = useState([])
    
    const getRequest = async() => {
        const res = await dbFetch.get(`/request/slug/${slug}`)
        setRequest(res.data)
        setItems(res.data.items.split(", "))
        if (loading) { setLoading(false) }
    }

    useEffect(() => {
        getRequest()
    }, [])

    return (
        <div className={styles.request_by_slug}>
            <h1>Pedido {request.id}</h1>

            {loading ? (
                <img src="/loading.svg" alt="Carregando" />
            ) : (
                <div>
                    {items &&
                        items.map((item, index) => (
                            <p key={index}>{item}</p>
                        ))
                    }

                    <p className={styles.request_by_slug_value}>R${request.value}</p>

                    { request.details && <p>OBS: {request.details}</p> }
                </div>
            )}
            
        </div>
    )
}

export default RequestBySlug