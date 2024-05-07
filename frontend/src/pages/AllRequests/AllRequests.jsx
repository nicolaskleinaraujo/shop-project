// CSS
import styles from "./AllRequests.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const AllRequests = () => {
    const [requests, setRequests] = useState([])

    const getAllRequests = async() => {
        const res = await dbFetch.get("/request")
        setRequests(res.data)
    }

    const delivered = async(id) => {

    }
    
    useEffect(() => {
        getAllRequests()
    }, [])

    return (
        <div className={styles.all_requests}>
            <h1>Todos os Pedidos</h1>

            { requests && 
                requests.map((request) => (
                    <div key={request.id}>
                        <p>{request.items} | R${request.value}</p>

                        { request.details && <p>OBS: {request.details}</p> }

                        <p>
                            <Link to={`/request/${request.slug}`}>Ver Pedido</Link> | 
                            { !request.delivered ? (
                                <button>Marcar Entregue</button>
                            ) : (
                                <button>Desmarcar Entregue</button>
                            )}
                        </p>
                    </div>
                ))
            }
        </div>
    )
}

export default AllRequests