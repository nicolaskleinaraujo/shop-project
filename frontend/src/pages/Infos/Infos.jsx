// CSS
import styles from "./Infos.module.css"

// Modules
import dbFetch from "../../axios/config"
import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"

// Context
import { UserContext } from "../../context/UserContext"

const Infos = () => {
    const { userId } = useContext(UserContext)
    const navigate = useNavigate()
    const [step, setStep] = useState(0)

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [number, setNumber] = useState()
    const [city, setCity] = useState("")
    const [street, setStreet] = useState("")
    const [houseNum, setHouseNum] = useState()

    const getInfos = async() => {
        const res = await dbFetch.get(`/user/${userId}`)

        setFullName(res.data.fullName)
        setEmail(res.data.email)
        setPassword(res.data.password)

        setNumber(res.data.number)
        setCity(res.data.city)
        setStreet(res.data.street)
        setHouseNum(res.data.houseNum)
    }

    const updateInfos = async(e) => {
        e.preventDefault()

        try {
            await dbFetch.post("/user/update", {
                id: userId,
                fullName,
                email,
                password,
                number: parseInt(number),
                city,
                street,
                houseNum: parseInt(houseNum),
            })

            navigate("/")
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getInfos()
    }, [])

    return (
        <div className={styles.infos}>
            <form onSubmit={updateInfos}>
                <h1>Infos</h1>

                {step === 0 ? (
                    <>
                        <input 
                            type="text" 
                            placeholder="Nome completo" 
                            onChange={(e) => setFullName(e.target.value)} 
                            value={fullName} 
                        />

                        <input 
                            type="email" 
                            placeholder="Email" 
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email} 
                        />

                        <input 
                            type="password" 
                            placeholder="Senha" 
                            onChange={(e) => setPassword(e.target.value)} 
                            value={password} 
                        />

                        <button onClick={() => setStep(1)}>Continuar</button>
                    </>
                ) : (
                    <>
                        <input 
                            type="number" 
                            placeholder="N° de Telefone" 
                            onChange={(e) => setNumber(e.target.value)} 
                            value={number} 
                        />

                        <input 
                            type="text" 
                            placeholder="Cidade" 
                            onChange={(e) => setCity(e.target.value)} 
                            value={city}
                        />

                        <input 
                            type="text" 
                            placeholder="Rua" 
                            onChange={(e) => setStreet(e.target.value)} 
                            value={street}
                        />

                        <input 
                            type="number" 
                            placeholder="N° da Casa" 
                            onChange={(e) => setHouseNum(e.target.value)} 
                            value={houseNum}
                        />

                        <input type="submit" value="Atualizar" />
                        <button onClick={() => setStep(0)}>Voltar</button>
                    </>
                )}
            </form>
        </div>
    )
}

export default Infos