// CSS
import styles from "./UpdateItem.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

const UpdateItem = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [value, setValue] = useState()

    const getItem = async() => {
        const res = await dbFetch.get(`/item/${id}`)
        setName(res.data.name)
        setDescription(res.data.description)
        setValue(res.data.value)
    }

    const handleUpdate = async(e) => {
        e.preventDefault()

        await dbFetch.post(`/item/update`, {
            id: parseInt(id),
            name,
            description,
            value: parseFloat(value),
        })

        navigate("/items")
    }

    useEffect(() => {
        getItem()
    }, [])

    return (
        <div className={styles.update_item}>
            <form onSubmit={handleUpdate}>
                <h1>Atualizar Item</h1>

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
            </form>
        </div>
    )
}

export default UpdateItem