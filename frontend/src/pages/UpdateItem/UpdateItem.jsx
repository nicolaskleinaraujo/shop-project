// CSS
import styles from "./UpdateItem.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const UpdateItem = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [value, setValue] = useState()

    const getItem = async() => {
        const res = await dbFetch.get(`/item/${id}`)
        setName(res.data.name)
        setDescription(res.data.description)
        setValue(res.data.value)
        if (loading) { setLoading(false) }
    }

    const handleUpdate = async(e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await dbFetch.post(`/item/update`, {
                id: parseInt(id),
                name,
                description,
                value: parseFloat(value),
            })
            
            toast.success(res.data.msg)
            navigate("/items")
        } catch (err) {
            toast.error(err.response.data.msg)
            setLoading(false)
        }
    }

    useEffect(() => {
        getItem()
    }, [])

    return (
        <div className={styles.update_item}>
            <form onSubmit={handleUpdate}>
                <h1>Atualizar Item</h1>

                {loading ? (
                    <img src="/loading.svg" alt="Carregando" />
                ) : (
                    <>
                        <input 
                            type="text" 
                            placeholder="Nome do Produto" 
                            onChange={(e) => setName(e.target.value)} 
                            value={name} 
                        />

                        <input 
                            type="text" 
                            placeholder="Descrição do Produto" 
                            onChange={(e) => setDescription(e.target.value)} 
                            value={description} 
                        />

                        <input 
                            type="number" 
                            placeholder="Valor do Produto" 
                            onChange={(e) => setValue(e.target.value)} 
                            value={value} 
                            step={0.01} 
                            min={0} 
                        />

                        <input type="submit" value="Atualizar" />
                    </>
                )}
            </form>
        </div>
    )
}

export default UpdateItem