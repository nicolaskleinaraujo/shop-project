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

    useEffect(() => {
        getRequests()
    }, [])

    return (
        <div>
            <h1>RequestByUser</h1>

            <button onClick={() => console.log(items)}>TESTE</button>

            {requests && (
                requests.map((request) => (
                    <p key={request.id}>{request.items} - <Link to={`/request/${request.slug}`}>VER MAIS</Link></p>
                ))
            )}
        </div>
    )
}

export default RequestByUser