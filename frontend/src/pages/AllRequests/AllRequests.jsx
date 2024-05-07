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
    
    useEffect(() => {
        getAllRequests()
    }, [])

    return (
        <div>
            <h1>All Requests</h1>

            { requests && 
                requests.map((request) => (
                    <div key={request.id}>
                        <p>{request.items} | R${request.value}</p>

                        { request.details && <p>OBS: {request.details}</p> }

                        <p>
                            <Link to={`/request/${request.slug}`}>Ver Pedido</Link> | 
                            <button>Cancelar</button>
                            <button>Entregue</button>
                        </p>
                    </div>
                ))
            }
        </div>
    )
}

export default AllRequests