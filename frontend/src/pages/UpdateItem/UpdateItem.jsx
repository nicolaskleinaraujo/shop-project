// CSS
import styles from "./UpdateItem.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const UpdateItem = () => {
    const { id } = useParams()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [value, setValue] = useState()

    const getItem = async() => {
        const res = await dbFetch.get(`/item/${id}`)
        setName(res.data.name)
        setDescription(res.data.description)
        setValue(res.data.value)
    }

    useEffect(() => {
        getItem()
    }, [])

    return (
        <div className={styles.update_item}>
            <form>
                <h1>Update Item</h1>

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
                />

                <input type="submit" value="Atualizar" />
            </form>
        </div>
    )
}

export default UpdateItem