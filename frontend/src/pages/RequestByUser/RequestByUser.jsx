// CSS
import styles from "./RequestByUser.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const RequestByUser = () => {
    const [requests, setRequests] = useState([])

    const getRequests = async() => {
        const res = await dbFetch.get("/request/user")
        setRequests(res.data)
    }

    const cancelRequest = async(id) => {
        try {
            await dbFetch.delete(`/request/delete/${id}`)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getRequests()
    }, [])

    return (
        <div>
            <h1>RequestByUser</h1>

            {requests && (
                requests.map((request) => (
                    <div key={request.id}>
                        <p>{request.items} | {request.value}</p>

                        { request.details && <p>{request.details}</p> }

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