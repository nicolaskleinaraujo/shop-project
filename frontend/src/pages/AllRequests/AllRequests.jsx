// CSS
import styles from "./AllRequests.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const AllRequests = () => {
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(true)

    const getAllRequests = async() => {
        const res = await dbFetch.get("/request")
        setRequests(res.data)
        if (loading) {setLoading(false)}
    }

    const delivered = async(id) => {
        await dbFetch.post(`/request/delivered/${id}`)
        setLoading(true)
    }
    
    useEffect(() => {
        getAllRequests()
    }, [loading])

    return (
        <div className={styles.all_requests}>
            <h1>Todos os Pedidos</h1>

            {loading ? (
                <img src="/loading.svg" alt="Carregando" />
            ) : (
                requests.map((request) => (
                    <div key={request.id}>
                        <p>{request.items} | {request.author.fullName}</p>

                        { request.details && <p>OBS: {request.details}</p> }

                        <p>{request.author.street} - {request.author.houseNum} | {request.author.city}</p>

                        <p>
                            <Link to={`/request/${request.slug}`}>Ver Pedido</Link> | 
                            { !request.delivered ? (
                                <button onClick={() => delivered(request.id)}>Marcar Entregue</button>
                            ) : (
                                <button onClick={() => delivered(request.id)}>Desmarcar Entregue</button>
                            )}
                        </p>
                    </div>
                )))
            }
        </div>
    )
}

export default AllRequests