// CSS
import styles from "./AllRequests.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState, useEffect } from "react"

// Components
import Box from "../../components/Box/Box"

const AllRequests = () => {
    const [requests, setRequests] = useState([])
    const [sort, setSort] = useState(null)

    const [loading, setLoading] = useState(true)
    const [update, setUpdate] = useState(false)

    const getRequests = async() => {
        const res = await dbFetch.get(`/request/${sort}`)
        setRequests(res.data)
        if (loading) { setLoading(false) }
        if (update) { setUpdate(false) }
    }

    const delivered = async(id) => {
        setLoading(true)
        await dbFetch.post(`/request/delivered/${id}`)
        setUpdate(true)
    }
    
    useEffect(() => {
        getRequests()
    }, [update === true])

    return (
        <div className={styles.all_requests}>
            <h1>Todos os Pedidos</h1>
            <select onChange={(e) => { setSort(e.target.value), setUpdate(true), setLoading(true) }}>
                <option value="null">Todos</option>
                <option value="false">Não entregue</option>
                <option value="true">Entregue</option>
            </select>

            {loading ? (
                <img src="/loading.svg" alt="Carregando" />
            ) : (
                requests.map((request) => (
                    <Box 
                        key={request.id}

                        name={request.author.fullName}
                        desc={request.items}
                        value={request.value}

                        btnText={!request.delivered ? "Marcar Entregue" : "Desmarcar Entregue"}
                        btnAction={() => delivered(request.id)}

                        linkText="Ver Pedido"
                        link={`/request/${request.slug}`}
                    />
                )))
            }
        </div>
    )
}

export default AllRequests