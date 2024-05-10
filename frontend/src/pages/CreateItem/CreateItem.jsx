// CSS
import styles from "./CreateItem.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const CreateItem = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [value, setValue] = useState(0.01)

    const handleCreate = async(e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await dbFetch.post("/item/create", {
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

    return (
        <div className={styles.create_item}>
            <form onSubmit={handleCreate}>
                <h1>Criar Item</h1>

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

                        <input type="submit" value="Criar" />
                    </>
                )}
            </form>
            
        </div>
    )
}

export default CreateItem