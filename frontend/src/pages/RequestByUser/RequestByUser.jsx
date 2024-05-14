// CSS
import styles from "./RequestByUser.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const RequestByUser = () => {
    const [loading, setLoading] = useState(true)
    const [update, setUpdate] = useState(false)
    const [requests, setRequests] = useState([])

    const getRequests = async() => {
        const res = await dbFetch.get("/request/user")
        setRequests(res.data)
        if (loading) { setLoading(false) }
        if (update) { setUpdate(false) }
    }

    const cancelRequest = async(id) => {
        setLoading(true)
        try {
            await dbFetch.delete(`/request/delete/${id}`)
            setUpdate(true)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getRequests()
    }, [update === true])

    return (
        <div className={styles.request_by_user}>
            <h1>Pedidos</h1>

            {loading ? (
                <img src="./loading.svg" alt="Carregando" />
            ) : (
                requests.map((request) => (
                    <div key={request.id}>
                        <p>{request.items} | R${request.value}</p>

                        { request.details && <p>OBS: {request.details}</p> }

                        <p>
                            <Link to={`/request/${request.slug}`}>Ver Pedido</Link> | 
                            <button onClick={() => cancelRequest(request.id)}>Cancelar</button>
                        </p>
                    </div>
                ))
            )}
        </div>
    )
}

export default RequestByUser