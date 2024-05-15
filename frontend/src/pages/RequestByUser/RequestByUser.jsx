// CSS
import styles from "./RequestByUser.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

// Components
import Box from "../../components/Box/Box"

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
            <h1>Meus Pedidos</h1>

            {loading ? (
                <img src="./loading.svg" alt="Carregando" />
            ) : (
                requests.map((request) => (
                    <Box 
                        key={request.id}

                        name={request.items}
                        value={request.value}
                        desc={request.details}

                        linkText="Ver Pedido"
                        link={`/request/${request.slug}`}

                        btnText="Cancelar"
                        btnAction={() => cancelRequest(request.id)}
                    />
                ))
            )}
        </div>
    )
}

export default RequestByUser