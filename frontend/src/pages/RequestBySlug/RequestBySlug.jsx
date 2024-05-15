// CSS
import styles from "./RequestBySlug.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

// Components
import Box from "../../components/Box/Box"

const RequestBySlug = () => {
    const { slug } = useParams()
    const [loading, setLoading] = useState(true)

    const [request, setRequest] = useState([])
    
    const getRequest = async() => {
        const res = await dbFetch.get(`/request/slug/${slug}`)
        setRequest(res.data)
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
                <Box
                    name={request.items}
                    value={request.value}
                    desc={request.details}
                />
            )}
            
        </div>
    )
}

export default RequestBySlug