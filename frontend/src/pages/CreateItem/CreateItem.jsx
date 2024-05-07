// CSS
import styles from "./CreateItem.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState } from "react"

const CreateItem = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [value, setValue] = useState()

    return (
        <div className={styles.create_item}>
            <form>
                <h1>Criar Item</h1>

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

                <input type="submit" value="Criar" />
            </form>
            
        </div>
    )
}

export default CreateItem