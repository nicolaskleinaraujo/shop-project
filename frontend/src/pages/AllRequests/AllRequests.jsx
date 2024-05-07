// CSS
import styles from "./AllRequests.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState, useEffect } from "react"

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
        </div>
    )
}

export default AllRequests