// CSS
import styles from "./RequestBySlug.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const RequestBySlug = () => {
    const { slug } = useParams()

    const [request, setRequest] = useState([])
    const getRequest = async() => {
        const res = await dbFetch.get(`/request/slug/${slug}`)
        setRequest(res.data)
    }

    useEffect(() => {
        getRequest()
    }, [])

    return (
        <div>
            <h1>Request By Slug</h1>
            <button onClick={() => console.log(request)}>teste</button>
        </div>
    )
}

export default RequestBySlug